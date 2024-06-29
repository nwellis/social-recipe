import { OrgFileMetadata, DatabaseEntityStore } from "@acme/core";
import { MongoEntityStore } from "../db/MongoEntityStore.js";
import { CollectionOptions } from "../db/EnsureMongoCollection.js";

export const OrgFileMetadataStore: DatabaseEntityStore<OrgFileMetadata> = new MongoEntityStore(
  new CollectionOptions<OrgFileMetadata>("org-file-metadata", "orgId", [
    {
      name: "_orgId_",
      key: {
        orgId: 1
      }
    },
  ]),
)