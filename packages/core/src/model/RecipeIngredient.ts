import { ServerEntityManaged } from "../index.js";
import type { MeasurementUnit } from "./MeasurementUnit.js";

export interface RecipeIngredient extends ServerEntityManaged {
  recipeId: string
  ingredientId: string
  measurementUnit: MeasurementUnit
  measurementQty: number
}