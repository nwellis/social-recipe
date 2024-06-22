import { queryOptions } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import ms from 'ms';

export const queryRecipe = (recipeId: string) => queryOptions({
  queryKey: ['recipe', recipeId],
  queryFn: async () => ApiClient.recipe.getRecipe.query(recipeId),
  retry: 0,
  enabled: Boolean(recipeId),
  staleTime: ms("10m"),
})

export const queryRecipes = (orgId: string) => queryOptions({
  queryKey: ['recipes', orgId],
  queryFn: async () => ApiClient.recipe.getRecipes.query({ orgId }),
  retry: 0,
  enabled: Boolean(orgId),
})