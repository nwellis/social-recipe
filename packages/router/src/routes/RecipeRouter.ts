import { RecipeService } from "@acme/server";
import { protectedProcedure, publicProcedure } from "../TRPC.js";
import { t } from "../TRPC.js";
import { procedureAssert } from "../util/Procedure.js";
import { z } from "zod";

export const recipeRouter = t.router({
  getRecipe: publicProcedure
    .input(z.string())
    .query(async (opts) => {
      const recipe = await RecipeService.Instance().getRecipe(opts.input)
      procedureAssert(recipe, 'NOT_FOUND')

      const isOwner = recipe.orgId === opts.ctx.session?.orgId
      procedureAssert(
        isOwner || recipe.publishedAt > 0,
        recipe.publishedAt > 0 ? 'FORBIDDEN' : 'NOT_FOUND'
      )

      return recipe
    }),

  getRecipes: protectedProcedure
    .input(z.object({
      orgId: z.string(),
    }))
    .query(async (opts) => {
      const recipes = await RecipeService.Instance().getRecipe(opts.input.orgId)
      return recipes
    }),

  deleteRecipe: protectedProcedure
    .input(z.string())
    .query(async (opts) => {
      const recipe = await RecipeService.Instance().getRecipe(opts.input)
      procedureAssert(recipe, 'NOT_FOUND')
      procedureAssert(recipe.orgId === opts.ctx.session.orgId, 'FORBIDDEN')

      await RecipeService.Instance().deleteRecipe(opts.input)
      return recipe
    }),
})