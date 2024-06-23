import { DatabaseEntityStore, Recipe, RecipeQuery, RecipeSlug, ServerEntityManaged } from "@acme/core";
import mem from "mem";
import { generateId } from "lucia";
import { RecipeSlugStore, RecipeStore } from "../../index.js";
import { DatabasePaginator } from '../../db/DatabasePaginator.js';
import { timestamps } from '@acme/util'

export class RecipeService {

  static Instance = mem(() => new RecipeService(RecipeStore, RecipeSlugStore))

  constructor(
    protected readonly recipe: DatabaseEntityStore<Recipe>,
    protected readonly recipeSlug: DatabaseEntityStore<RecipeSlug>,
  ) { }

  createId() {
    return generateId(15);
  }

  async getRecipe(id: string) {
    return this.recipe.findOne(id);
  }

  async getOrganizationRecipes(orgId: string) {
    return this.recipe.allWithOwner(orgId)
  }

  async searchPublishedRecipes({ next, ...query }: RecipeQuery) {
    return this.recipe.search({
      orgId: query.orgId,
      $and: [
        { title: { $regex: query.search, $options: 'i' } },
        { publishedAt: { $gt: 0 } },
      ].filter(Boolean)
    }, next)
  }

  async createRecipe(payload: Omit<Recipe, keyof ServerEntityManaged | "updatedAt">) {
    const recipe: Recipe = {
      ...payload,
      _id: this.createId(),
      __schema: 1,
      __version: 1,
      ...timestamps(Date.now(), 'createdAt', 'updatedAt'),
    }

    await this.recipe.set(recipe._id, recipe);

    return recipe;
  }

  async updateRecipe(payload: Partial<Recipe>) {
    await this.recipe.patch(payload._id, {
      ...payload,
      ...timestamps(Date.now(), 'updatedAt'),
    });
  }

  async deleteRecipe(id: string) {
    return this.recipe.delete(id)
  }
}