import { RecipeIngredient, ServerEntityManaged } from "../index.js";

export interface Recipe extends ServerEntityManaged {
  updatedAt: number
  publishedAt: number
  searchText: string

  orgId: string
  title: string
  description: string
  instructions: string
  ingredients: string[]
  // ingredients: RecipeIngredient[]
  tags: string[]
  serves: number
  durationMinutes: number
  difficulty: number
}