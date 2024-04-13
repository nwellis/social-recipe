import { Router } from "express"
import { GitHub, OAuth2RequestError, generateState } from "arctic"
import { parseCookies, serializeCookie } from "oslo/cookie"
import { ServerEnv } from "@acme/server-env"
import { lucia } from "../lib/Lucia.js"
import { OAuth2Service, UserCustomerService } from "@acme/server"
import { joinPaths } from "@acme/util"

export async function mkAuthForCustomerGitHubRouter() {
  const gitHub = new GitHub(
    ServerEnv.OAuth.GitHub.ClientID,
    ServerEnv.OAuth.GitHub.ClientSecret,
    {
      redirectURI: joinPaths(ServerEnv.Origin.Api, "api/v1/auth/github/callback")
    }
  )

  const router = Router()
  const oauthService = OAuth2Service.CustomerInstance()
  const userService = UserCustomerService.Instance()

  router.get("/", async (_, res) => {
    const state = generateState();
    const url = await gitHub.createAuthorizationURL(state);
    res
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
  })

  router.get("/callback", async (req, res) => {
    const code = req.query.code?.toString() ?? null;
    const state = req.query.state?.toString() ?? null;
    const storedState = parseCookies(req.headers.cookie ?? '').get('github_oauth_state') ?? null;
    if (!code || !state || !storedState || state !== storedState) {
      console.log(code, state, storedState);
      res.status(400).end();
      return;
    }

    const tokens = await gitHub.validateAuthorizationCode(code);

    // https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-the-authenticated-user
    const githubUserResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`
      }
    });

    const githubUser = await githubUserResponse.json() as { id: string, login: string, email: string };
    const existing = await oauthService.getOAuthAccount({ providerId: 'GitHub', providerUserId: githubUser.id });
    if (existing) {
      const session = await lucia.createSession(existing.userId, {});
      return res
        .appendHeader('Set-Cookie', lucia.createSessionCookie(session.id).serialize())
        .redirect(ServerEnv.Origin.Web);
    }

    const user = await userService.createUser({
      email: githubUser.email,
      emailVerified: Boolean(githubUser.email),
    })
    await oauthService.createOAuthAccount(user._id, {
      providerId: 'GitHub',
      providerUserId: githubUser.id
    })

    const session = await lucia.createSession(user._id, {});
    return res
      .appendHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize())
      .redirect(joinPaths(ServerEnv.Origin.Web, 'account'));
  })

  return router
}