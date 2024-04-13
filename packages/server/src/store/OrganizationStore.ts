import { Organization, DatabaseEntityStore } from "@acme/core";
import { MongoEntityStore } from "../db/MongoEntityStore.js";
import { CollectionOptions } from "../db/EnsureMongoCollection.js";

export const OrganizationStore: DatabaseEntityStore<Organization> = new MongoEntityStore(
  new CollectionOptions<Organization>("organization", "userId", [
    {
      name: "_userId_",
      key: {
        userId: 1
      }
    },
  ]),
)