import { DatabaseEntityStore, Recipe } from "@acme/core";
import { MongoEntityStore } from "../db/MongoEntityStore.js";
import { CollectionOptions } from "../db/EnsureMongoCollection.js";

export const RecipeStore: DatabaseEntityStore<Recipe> = new MongoEntityStore(
  new CollectionOptions<Recipe>("recipe", "orgId", [
    {
      name: "_orgId_",
      key: {
        orgId: 1
      }
    },
  ]),
)