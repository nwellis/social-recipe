import * as trpcExpress from '@trpc/server/adapters/express';
import { lucia } from './lib/Lucia.js';

export async function createAppRouterContext({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) {
  if (!req.cookies.auth_session) {
    return {
      session: undefined,
      user: undefined,
    }
  }

  const { session, user } = await lucia.validateSession(req.cookies.auth_session)
  return { session, user }
}

export type AppRouterContext = Awaited<ReturnType<typeof createAppRouterContext>>;