import { ServerEntityManaged } from "../index.js";

export type FolderType = "recipes"

export interface Folder extends ServerEntityManaged {
  __type: FolderType
  orgId: string
  name: string
  entityIds: string[]
  subfolderIds: string[]
}