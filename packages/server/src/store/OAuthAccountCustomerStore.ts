import { DatabaseEntityStore, OAuthAccount } from "@acme/core";
import { MongoEntityStore } from "../db/MongoEntityStore.js";
import { CollectionOptions } from "../db/EnsureMongoCollection.js";

export const OAuthAccountCustomerStore: DatabaseEntityStore<OAuthAccount> = new MongoEntityStore(
  new CollectionOptions<OAuthAccount>("oauth-customer", "userId", [
    {
      name: "_userId_",
      key: {
        userId: 1
      }
    },
  ]),
)