import { DatabaseEntityStore, RecipeSlug } from "@acme/core";
import { MongoEntityStore } from "../db/MongoEntityStore.js";
import { CollectionOptions } from "../db/EnsureMongoCollection.js";

export const RecipeSlugStore: DatabaseEntityStore<RecipeSlug> = new MongoEntityStore(
  new CollectionOptions<RecipeSlug>("recipe", "recipeId", [
    {
      name: "_recipeId_",
      key: {
        recipeId: 1
      }
    },
  ]),
)