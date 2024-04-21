import { publicProcedure } from "../TRPC.js";
import { t } from "../TRPC.js";
import { lucia } from '../lib/Lucia.js';

export const authRouter = t.router({
  getSession: publicProcedure.query(({ ctx }) => {
    return (ctx.session?.expiresAt?.valueOf() ?? 0) > Date.now() ? ctx.session : undefined
  }),
  deleteSession: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session?.id) {
      return
    }
    await lucia.invalidateSession(ctx.session.id)
  }),
})