import { ServerEntityManaged } from "../index.js";

export type FolderType = 'UserCreatedRecipes' | 'UserSavedRecipes'

export interface Folder extends ServerEntityManaged {
  __type: FolderType
  createdBy: 'System' | 'User'
  root: boolean
  permanent: boolean

  orgId: string
  title: string
  entityIds: string[]
  subfolderIds: string[]
}