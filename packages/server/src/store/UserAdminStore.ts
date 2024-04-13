import { DatabaseEntityStore, UserAdmin } from "@acme/core";
import { MongoEntityStore } from "../db/MongoEntityStore.js";
import { CollectionOptions } from "../db/EnsureMongoCollection.js";

export const UserAdminStore: DatabaseEntityStore<UserAdmin> = new MongoEntityStore(
  new CollectionOptions<UserAdmin>("user-admin", "_id", [
    {
      name: "_email_",
      unique: true,
      key: {
        email: 1
      }
    },
  ]),
)