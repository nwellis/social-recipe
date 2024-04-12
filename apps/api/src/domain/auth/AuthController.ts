import { Controller, Get, Req, Res, HttpRedirectResponse } from '@nestjs/common';
import { OAuth2Service, UserCustomerService } from '@acme/server';
import { OAuth2Providers } from './OAuth2Providers.js';
import { OAuth2RequestError, generateState } from 'arctic';
import { parseCookies, serializeCookie } from 'oslo/cookie';
import { ServerEnv } from '@acme/server-env';
import type { Request, Response } from '../../Framework.js';
import { lucia } from '../../lib/Lucia.js';

@Controller('auth')
export class AuthController {
  constructor(
    private providers: OAuth2Providers,
    private readonly userService: UserCustomerService,
    private readonly oauthService: OAuth2Service,
  ) { }

  @Get('/github')
  async getGitHubAuth(
    @Res({ passthrough: true }) response: Response
  ) {
    const state = generateState();
    console.log(this.providers, this.userService)
    const url = await this.providers.gitHub.createAuthorizationURL(state);

    response
      .appendHeader(
        'Set-Cookie',
        serializeCookie('github_oauth_state', state, {
          path: '/',
          secure: ServerEnv.Https,
          httpOnly: true,
          maxAge: 60 * 10,
          sameSite: 'lax'
        })
      )
      .redirect(url.toString());
  }

  @Get('/github/callback')
  async getGitHubAuthCallback(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    const code = request.query.code?.toString() ?? null;
    const state = request.query.state?.toString() ?? null;
    const storedState = parseCookies(request.headers.cookie ?? '').get('github_oauth_state') ?? null;
    if (!code || !state || !storedState || state !== storedState) {
      console.log(code, state, storedState);
      response.status(400).end();
      return;
    }
    try {
      const tokens = await this.providers.gitHub.validateAuthorizationCode(code);

      // https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-the-authenticated-user
      const githubUserResponse = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`
        }
      });

      const githubUser = await githubUserResponse.json() as { id: string, login: string, email: string };
      const existing = await this.oauthService.getOAuthAccount({ providerId: 'GitHub', providerUserId: githubUser.id });
      if (existing) {
        const session = await lucia.createSession(existing.userId, {});
        return response
          .appendHeader('Set-Cookie', lucia.createSessionCookie(session.id).serialize())
          .redirect(ServerEnv.Origin.Web);
      }

      const user = await this.userService.createUser({
        __version: 1,
        __schema: 1,
        email: githubUser.email,
        emailVerified: Boolean(githubUser.email),
      })
      await this.oauthService.createOAuthAccount(user._id, {
        providerId: 'GitHub',
        providerUserId: githubUser.id
      })

      const session = await lucia.createSession(user._id, {});
      // TODO: look into? https://docs.nestjs.com/controllers#redirection
      // const redirect: HttpRedirectResponse = {
      //   url: ServerEnv.Origin.Web,
      //   statusCode: 301,
      // }

      return response
        .appendHeader('Set-Cookie', lucia.createSessionCookie(session.id).serialize())
        .redirect(ServerEnv.Origin.Web);

    } catch (e) {
      if (e instanceof OAuth2RequestError && e.message === 'bad_verification_code') {
        // invalid code
        response.status(400).end();
        return;
      }
      response.status(500).end();
      return;
    }
  }
}
