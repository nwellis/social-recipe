import { ServerEntityManaged } from "../index.js";
import type { MeasurementUnit } from "./MeasurementUnit.js";

// https://www.ars.usda.gov/northeast-area/beltsville-md-bhnrc/beltsville-human-nutrition-research-center/methods-and-application-of-food-composition-laboratory/mafcl-site-pages/sr11-sr28/
// https://www.ars.usda.gov/ARSUserFiles/80400525/Data/SR27/asc/FOOD_DES.txt
export interface RecipeIngredient extends ServerEntityManaged {
  recipeId: string
  ingredientId: string
  measurementUnit: MeasurementUnit
  measurementQty: number
}