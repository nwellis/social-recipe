import { DatabaseEntityStore, SessionAdmin } from "@acme/core";
import { MongoEntityStore } from "../db/MongoEntityStore.js";
import { CollectionOptions } from "../db/EnsureMongoCollection.js";

export const SessionAdminStore: DatabaseEntityStore<SessionAdmin> = new MongoEntityStore(
  new CollectionOptions<SessionAdmin>("session-admin", "userId", [
    {
      name: "_userId_",
      key: {
        userId: 1
      }
    },
  ]),
)