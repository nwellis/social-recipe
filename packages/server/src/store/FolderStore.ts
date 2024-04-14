import { DatabaseEntityStore, Folder } from "@acme/core";
import { MongoEntityStore } from "../db/MongoEntityStore.js";
import { CollectionOptions } from "../db/EnsureMongoCollection.js";

export const FolderStore: DatabaseEntityStore<Folder> = new MongoEntityStore(
  new CollectionOptions<Folder>("organization", "orgId", [
    {
      name: "_orgId_",
      key: {
        orgId: 1
      }
    },
  ]),
)