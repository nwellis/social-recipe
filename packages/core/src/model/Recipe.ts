import { RecipeIngredient, ServerEntityManaged } from "../index.js";

export interface Recipe extends ServerEntityManaged {
  updatedAt: number
  publishedAt: number

  orgId: string
  slug: string
  title: string
  description: string
  ingredients: RecipeIngredient[]
  steps: string[]
  tags: string[]
  // rating: number
  serves: number
}