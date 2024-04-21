import { DatabaseEntityStore, Recipe, RecipeSlug, ServerEntityManaged } from "@acme/core";
import mem from "mem";
import { generateId } from "lucia";
import { RecipeSlugStore, RecipeStore } from "../../index.js";
import { DatabasePaginator } from '../../db/DatabasePaginator.js';

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

  async searchOrganizationRecipes(query: {
    orgId: string,
  }) {
    return new DatabasePaginator(this.recipe)
      .pageThroughAllWithOwner(query.orgId, {
        $and: [
        ].filter(Boolean)
      })
  }

  async searchRecipes(query: {}) {
    return this.recipe.search({})
  }

  async createRecipe(payload: Omit<Recipe, keyof ServerEntityManaged | "updatedAt">) {
    const recipe: Recipe = {
      ...payload,
      _id: this.createId(),
      __schema: 1,
      __version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }

    await this.recipe.set(recipe._id, recipe);

    return recipe;
  }

  async deleteRecipe(id: string) {
    return this.recipe.delete(id)
  }
}