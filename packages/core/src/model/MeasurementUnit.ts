import { StrEnum } from "@acme/util"

export const DryMeasurementUnits = new StrEnum([
  "pinch", "dash", "handful", "tsp", "tbsp", "oz", "lb", "g", "kg",
] as const)
export type DryMeasurementUnit = (typeof DryMeasurementUnits)["values"][number]

export const LiquidMeasurementUnits = new StrEnum([
  "tsp", "tbsp", "floz", "cup", "pt", "qt", "gal", "ml", "l",
] as const)
export type LiquidMeasurementUnit = (typeof LiquidMeasurementUnits)["values"][number]

export const BundleMeasurementUnits = new StrEnum([
  "couple", "bunch"
] as const)
export type BundleMeasurementUnit = (typeof BundleMeasurementUnits)["values"][number]

export const MeasurementUnits = DryMeasurementUnits
  .add(LiquidMeasurementUnits)
  .add(BundleMeasurementUnits)

export type MeasurementUnit = (typeof MeasurementUnits)["values"][number]
