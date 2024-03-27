export class Cursor<TEntity> {
  constructor(
    readonly entities: TEntity[],
    readonly next: string
  ) { }
}
