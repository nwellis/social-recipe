import { ServerEntityManaged } from "../index.js";

export interface EntityStats extends ServerEntityManaged {
  views: number
  shares: number
  ratings: Record<number, number>
}