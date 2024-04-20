import { DatabaseEntityStore, Recipe, ServerEntityManaged } from "@acme/core";
import mem from "mem";
import { generateId } from "lucia";
import { RecipeStore } from "../../index.js";

export class RecipeService {

  static Instance = mem(() => new RecipeService(RecipeStore))

  constructor(
    protected readonly recipe: DatabaseEntityStore<Recipe>,
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

  async searchRecipes(query: {
    orgId: string,
  }) {
    return this.recipe.searchWithOwner(query.orgId, {
      $and: [
      ].filter(Boolean)
    })
  }

  async createRecipe(payload: Omit<Recipe, keyof ServerEntityManaged>) {
    const recipe: Recipe = {
      ...payload,
      _id: this.createId(),
      __schema: 1,
      __version: 1,
      createdAt: Date.now(),
    }

    await this.recipe.set(recipe._id, recipe);

    return recipe;
  }

  async deleteRecipe(id: string) {
    return this.recipe.delete(id)
  }
}