import { DatabaseEntityStore, SessionCustomer } from "@acme/core";
import { MongoEntityStore } from "../db/MongoEntityStore.js";
import { CollectionOptions } from "../db/EnsureMongoCollection.js";

export const SessionCustomerStore: DatabaseEntityStore<SessionCustomer> = new MongoEntityStore(
  new CollectionOptions<SessionCustomer>("session-customer", "userId", [
    {
      name: "_userId_",
      key: {
        ownerId: 1
      }
    },
  ]),
)