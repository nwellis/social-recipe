import { UserCustomerService } from "@acme/server";
import { protectedProcedure } from "../TRPC.js";
import { t } from "../TRPC.js";
import { procedureAssert } from "../util/Procedure.js";
import { z } from "zod";

export const userCustomerRouter = t.router({
  getSelf: protectedProcedure
    .query(async (opts) => {
      const user = await UserCustomerService.Instance().getUser(opts.ctx.user.id)
      procedureAssert(user, 'NOT_FOUND')
      return user
    }),

  getUser: protectedProcedure
    .input(z.string())
    .query(async (opts) => {
      const user = UserCustomerService.Instance().getUser(opts.input)
      procedureAssert(user, 'NOT_FOUND')
      return user
    }),
})