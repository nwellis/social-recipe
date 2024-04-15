import { ServerEntityManaged } from "../index.js";

export interface Recipe extends ServerEntityManaged {
  updatedAt: number

  orgId: string
  name: string
  description: string
  ingredients: string[]
  steps: string[]
  tags: string[]
  // rating: number
  serves: number
}