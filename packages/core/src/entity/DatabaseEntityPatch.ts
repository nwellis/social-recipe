import { Filter } from "mongodb";

export interface DatabaseEntityPatch<TEntity> {
  _id: string
  values: Partial<TEntity>
  filter?: Filter<TEntity>
}
