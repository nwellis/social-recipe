import { OrganizationService, UserCustomerService } from "@acme/server";
import { protectedProcedure } from "../TRPC.js";
import { t } from "../TRPC.js";
import { procedureAssert } from "../util/Procedure.js";
import { z } from "zod";

export const userCustomerRouter = t.router({
  getSelf: protectedProcedure
    .query(async (opts) => {
      const user = await UserCustomerService.Instance().getUser(opts.ctx.user.id)
      procedureAssert(user, 'NOT_FOUND')

      const organizations = await OrganizationService.Instance().getOrgs({ userId: opts.ctx.user.id })

      return {
        ...user,
        organization: organizations.at(0),
      }
    }),

  getUser: protectedProcedure
    .input(z.string())
    .query(async (opts) => {
      const user = UserCustomerService.Instance().getUser(opts.input)
      procedureAssert(user, 'NOT_FOUND')
      return user
    }),

  addSavedRecipe: protectedProcedure
    .input(z.string())
    .mutation(async (opts) => {
      const savedRecipeIds = await UserCustomerService.Instance().addSavedRecipe(opts.ctx.user.id, opts.input)
      return savedRecipeIds
    }),

  removeSavedRecipe: protectedProcedure
    .input(z.string())
    .mutation(async (opts) => {
      const savedRecipeIds = await UserCustomerService.Instance().removeSavedRecipe(opts.ctx.user.id, opts.input)
      return savedRecipeIds
    }),
})