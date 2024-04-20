import { queryOptions } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";

export const queryRecipe = (recipeId: string) => queryOptions({
  queryKey: ['recipe', recipeId],
  queryFn: async () => ApiClient.recipe.getRecipe.query(recipeId),
  retry: 0,
})