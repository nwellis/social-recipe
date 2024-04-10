import { Controller, Get, Req, Res, HttpRedirectResponse } from '@nestjs/common';
import { OAuth2Service } from '@acme/server';
import { OAuth2Providers } from './OAuth2Providers.js';
import { UserCustomer } from '@acme/core';
import { OAuth2RequestError, generateState } from 'arctic';
import { parseCookies, serializeCookie } from 'oslo/cookie';
import { ServerEnv } from '@acme/server-env';
import type { Request, Response } from '../../Framework.js';
import { lucia } from '../../lib/Lucia.js';

@Controller()
export class AuthController {
  constructor(
    private readonly providers: OAuth2Providers,
    private readonly oauthService: OAuth2Service<UserCustomer>,
  ) { }

  @Get("/github")
  async getGitHubAuth(
    @Res({ passthrough: true }) response: Response
  ) {
    const state = generateState();
    const url = await this.providers.gitHub.createAuthorizationURL(state);

    response
      .appendHeader(
        "Set-Cookie",
        serializeCookie("github_oauth_state", state, {
          path: "/",
          secure: ServerEnv.Https,
          httpOnly: true,
          maxAge: 60 * 10,
          sameSite: "lax"
        })
      )
      .redirect(url.toString());
  }

  @Get("/github/callback")
  async getGitHubAuthCallback(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    const code = request.query.code?.toString() ?? null;
    const state = request.query.state?.toString() ?? null;
    const storedState = parseCookies(request.headers.cookie ?? "").get("github_oauth_state") ?? null;
    if (!code || !state || !storedState || state !== storedState) {
      console.log(code, state, storedState);
      response.status(400).end();
      return;
    }
    try {
      const tokens = await this.providers.gitHub.validateAuthorizationCode(code);

      // https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-the-authenticated-user
      const githubUserResponse = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`
        }
      });

      const githubUser = await githubUserResponse.json() as { id: string, login: string, email: string };
      const exitingUser = await this.oauthService.getUser({ providerId: "GitHub", providerUserId: githubUser.id });
      if (exitingUser) {
        const session = await lucia.createSession(exitingUser._id, {});
        return response
          .appendHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize())
          .redirect(ServerEnv.Origin.Web);
      }

      const userId = this.oauthService.createUserId();
      await this.oauthService.createUser(
        {
          _id: userId,
          __version: 1,
          __schema: 1,
          email: githubUser.email,
          emailVerified: Boolean(githubUser.email),
        },
        {
          providerId: "GitHub",
          providerUserId: githubUser.id
        }
      )

      const session = await lucia.createSession(userId, {});
      // TODO: look into? https://docs.nestjs.com/controllers#redirection
      // const redirect: HttpRedirectResponse = {
      //   url: ServerEnv.Origin.Web,
      //   statusCode: 301,
      // }

      return response
        .appendHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize())
        .redirect(ServerEnv.Origin.Web);

    } catch (e) {
      if (e instanceof OAuth2RequestError && e.message === "bad_verification_code") {
        // invalid code
        response.status(400).end();
        return;
      }
      response.status(500).end();
      return;
    }
  }
}
