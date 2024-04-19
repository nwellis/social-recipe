import { RecipeIngredient, ServerEntityManaged } from "../index.js";

export interface Recipe extends ServerEntityManaged {
  updatedAt: number

  orgId: string
  slug: string
  name: string
  description: string
  ingredients: RecipeIngredient[]
  steps: string[]
  tags: string[]
  // rating: number
  serves: number
}