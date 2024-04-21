import { RecipeService } from "@acme/server";
import { protectedProcedure, publicProcedure } from "../TRPC.js";
import { t } from "../TRPC.js";
import { procedureAssert } from "../util/Procedure.js";
import { z } from "zod";
import { UrlSlugValidator } from '@acme/util';

const ResourceSchema = z.object({
  title: z.string()
    .min(8, 'Title must be at least 8 characters')
    .max(100, 'Title must be less that 100 characters'),
  instructions: z.string().min(1, 'Please provide instructions'),
})

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

  getRecipes: publicProcedure
    .input(z.object({
      orgId: z.string(),
    }))
    .query(async (opts) => {
      const recipes = await RecipeService.Instance().getOrganizationRecipes(opts.input.orgId)
      return recipes
    }),

  createRecipe: protectedProcedure
    .input(ResourceSchema)
    .query(async (opts) => {
      return RecipeService.Instance().createRecipe({
        publishedAt: 0,
        orgId: opts.ctx.session.orgId,
        slug: new UrlSlugValidator().mkSlug(opts.input.title),
        title: opts.input.title.trim(),
        description: "",
        instructions: opts.input.instructions.trim(),
        ingredients: [],
        tags: [],
        durationMinutes: 0,
        serves: 0,
        difficulty: 0,
      })
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