import * as trpcExpress from '@trpc/server/adapters/express';
import { lucia } from './lib/Lucia.js';

export async function createAppRouterContext({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) {
  const core = { req, res }

  if (!req.cookies.auth_session) {
    return {
      session: undefined,
      user: undefined,
      ...core,
    }
  }

  const { session, user } = await lucia.validateSession(req.cookies.auth_session)
  return { session, user, ...core }
}

export type AppRouterContext = Awaited<ReturnType<typeof createAppRouterContext>>;