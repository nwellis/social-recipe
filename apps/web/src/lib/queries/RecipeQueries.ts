import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";
import type { RecipeQuery } from '@acme/core';
import ms from 'ms';
import { objToReactQueryKey } from '.';

export const queryRecipe = (recipeId: string) => queryOptions({
  queryKey: ['recipe', recipeId],
  queryFn: async () => ApiClient.recipe.getRecipe.query(recipeId),
  retry: 0,
  enabled: Boolean(recipeId),
  staleTime: ms("10m"),
})

export const queryOrgRecipes = (orgId: string) => queryOptions({
  queryKey: ['recipes', `org=${orgId}`],
  queryFn: async () => ApiClient.recipe.getRecipes.query({ orgId }),
  retry: 0,
  enabled: Boolean(orgId),
})

export const queryPublishedRecipes = (query: RecipeQuery) => queryOptions({
  queryKey: ['recipes'].concat(objToReactQueryKey(query, 'orgId', 'search')),
  queryFn: async () => ApiClient.recipe.searchPublishedRecipes.query(query),
  retry: 0,
})

export const queryInfinitePublishedRecipes = (query: RecipeQuery) => infiniteQueryOptions({
  queryKey: ['recipes'].concat(objToReactQueryKey(query, 'orgId', 'search')),
  queryFn: (ctx) => ApiClient.recipe.searchPublishedRecipes.query({ ...query, next: ctx.pageParam }),
  retry: 0,

  initialPageParam: "",
  getNextPageParam: (lastPage) => lastPage.next || undefined,
})