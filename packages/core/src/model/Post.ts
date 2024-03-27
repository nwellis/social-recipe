import { ServerEntity } from "../index.js";

export interface Post extends ServerEntity {
  userId: string
  createdAt: number
  deletedAt: number
  content: string
}