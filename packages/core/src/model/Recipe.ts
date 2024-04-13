import { ServerEntityManaged } from "../index.js";

export interface Recipe extends ServerEntityManaged {
  name: string
  description: string
  ingredients: string[]
  steps: string[]
  tags: string[]
  rating: number
  image: string
}