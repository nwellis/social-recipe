import { ServerEntityManaged } from "../index.js";

export interface Ingredient extends ServerEntityManaged {
  updatedAt: number
  title: string
  description: string
}