export interface DatabaseEntityInsert<TEntity> {
  _id: string
  values: Omit<TEntity, "_id">
}
