import { RecipeService } from "@acme/server";
import { protectedProcedure, publicProcedure } from "../TRPC.js";
import { t } from "../TRPC.js";
import { procedureAssert } from "../util/Procedure.js";
import { z } from "zod";
import { RecipeQuery } from '@acme/core';

const ResourceSchema = z.object({
  title: z.string()
    .min(8, 'Title must be at least 8 characters')
    .max(100, 'Title must be less that 100 characters'),
  instructions: z.string().min(1, 'Please provide instructions'),
  publishedAt: z.number().min(0).optional(),
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

  searchPublishedRecipes: publicProcedure
    .input(z.object({
      search: z.string().optional(),
      orgId: z.string().optional(),
      next: z.string().optional(),
    }) satisfies z.ZodSchema<RecipeQuery>)
    .query(async (opts) => {
      const recipes = await RecipeService.Instance().searchPublishedRecipes(opts.input)
      return recipes
    }),

  createRecipe: protectedProcedure
    .input(ResourceSchema)
    .mutation(async (opts) => {
      return RecipeService.Instance().createRecipe({
        publishedAt: 0,
        orgId: opts.ctx.session.orgId,
        imageIds: [],
        title: opts.input.title.trim(),
        description: "",
        instructions: opts.input.instructions.trim(),
        ingredients: [],
        tags: [],
        durationMinutes: 0,
        serves: 2,
        difficulty: 3,
      })
    }),

  updateRecipe: protectedProcedure
    .input(ResourceSchema
      .partial()
      .extend({ _id: z.string() })
    )
    .mutation(async (opts) => {
      const { _id, ...patch } = opts.input
      const recipe = await RecipeService.Instance().getRecipe(_id)
      procedureAssert(recipe, 'NOT_FOUND')
      procedureAssert(recipe.orgId === opts.ctx.session.orgId, 'FORBIDDEN')

      return await RecipeService.Instance().updateRecipe({
        _id,
        ...patch,
      })
    }),

  deleteRecipe: protectedProcedure
    .input(z.string())
    .mutation(async (opts) => {
      const recipe = await RecipeService.Instance().getRecipe(opts.input)
      procedureAssert(recipe, 'NOT_FOUND')
      procedureAssert(recipe.orgId === opts.ctx.session.orgId, 'FORBIDDEN')

      await RecipeService.Instance().deleteRecipe(opts.input)
      return recipe
    }),
})