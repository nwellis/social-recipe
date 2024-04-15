import { ServerEntityManaged } from "../index.js";

export type FolderType = 'Recipes'

export interface Folder extends ServerEntityManaged {
  __type: FolderType
  createdBy: 'system' | 'user'
  orgId: string
  name: string
  entityIds: string[]
  subfolderIds: string[]
}