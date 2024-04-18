import { ServerEntityManaged } from "../index.js";

export interface Ingredient extends ServerEntityManaged {
  updatedAt: number
  name: string
  description: string
}