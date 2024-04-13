import { DatabaseEntityStore, UserCustomer } from "@acme/core";
import { MongoEntityStore } from "../db/MongoEntityStore.js";
import { CollectionOptions } from "../db/EnsureMongoCollection.js";

export const UserCustomerStore: DatabaseEntityStore<UserCustomer> = new MongoEntityStore(
  new CollectionOptions<UserCustomer>("user-customer", "_id", [
    {
      name: "_email_",
      unique: true,
      key: {
        email: 1
      }
    },
  ]),
)