import { DatabaseEntityStore, Recipe, RecipeQuery, RecipeSlug, ServerEntityManaged } from "@acme/core";
import mem from "mem";
import { generateId } from "lucia";
import { RecipeSlugStore, RecipeStore } from "../../index.js";
import { sanitizeRegex, timestamps } from '@acme/util'
import { assert } from 'ts-essentials';

export class RecipeService {

  static Instance = mem(() => new RecipeService(RecipeStore, RecipeSlugStore))

  constructor(
    protected readonly recipe: DatabaseEntityStore<Recipe>,
    protected readonly recipeSlug: DatabaseEntityStore<RecipeSlug>,
  ) { }

  createId() {
    return generateId(15);
  }

  decorateWithSearchText(recipe: Omit<Recipe, "searchText">) {
    return {
      ...recipe,
      searchText: [
        recipe.title.trim().replace(/\s+/g, ' '),
        recipe.instructions.trim().replace(/\s+/g, ' '),
        recipe.description.trim().replace(/\s+/g, ' '),
      ].join(' '),
    }
  }

  async getRecipe(id: string) {
    return this.recipe.findOne(id);
  }

  async getOrganizationRecipes(orgId: string) {
    return this.recipe.allWithOwner(orgId)
  }

  async searchPublishedRecipes({ next, ...query }: RecipeQuery) {
    if (Object.values(query).every(v => !v)) {
      return this.recipe.search({}, next)
    }

    return this.recipe.search({
      publishedAt: { $gt: 0 },
      $and: [
        query.orgId && { orgId: query.orgId },
        query.search && {
          searchText: {
            $regex: sanitizeRegex(query.search),
            $options: 'i'
          }
        },
        { publishedAt: { $gt: 0 } },
      ].filter(Boolean)
    }, next)
  }

  async createRecipe(payload: Omit<Recipe, keyof ServerEntityManaged | "updatedAt" | "searchText">) {
    const recipe: Recipe = this.decorateWithSearchText({
      ...payload,
      _id: this.createId(),
      __schema: 1,
      __version: 1,
      ...timestamps(Date.now(), 'createdAt', 'updatedAt'),
    })

    await this.recipe.set(recipe._id, recipe);

    return recipe;
  }

  async updateRecipe({ _id, ...payload }: Partial<Recipe>) {
    const recipe = await this.recipe.findOne(_id)
    assert(recipe)

    const updated = this.decorateWithSearchText({
      ...recipe,
      ...payload,
      ...timestamps(Date.now(), 'updatedAt'),
    })

    await this.recipe.patch(_id, {
      ...updated,
      ...timestamps(Date.now(), 'updatedAt'),
    });

    return updated
  }

  async deleteRecipe(id: string) {
    return this.recipe.delete(id)
  }
}