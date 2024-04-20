import { publicProcedure } from "../TRPC.js";
import { t } from "../TRPC.js";

export const authRouter = t.router({
  getSession: publicProcedure.query(({ ctx }) => {
    return (ctx.session?.expiresAt?.valueOf() ?? 0) > Date.now() ? ctx.session : undefined
  }),
})