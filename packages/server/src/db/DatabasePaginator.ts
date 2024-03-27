import { DatabaseEntityStore, ServerEntity } from "@acme/core";
import { Filter, SortDirection } from "mongodb";

export class DatabasePaginator<TEntity extends ServerEntity> {

  constructor(
    private readonly store: DatabaseEntityStore<TEntity>
  ) { }

  async pageThroughAll(
    query: Filter<TEntity> = {},
    pick?: Partial<Record<keyof TEntity, number>>,
    sort?: Partial<Record<keyof TEntity, SortDirection>>,
  ) {
    const acc: TEntity[] = []

    let continueFrom: string
    do {
      const { entities, next } = await this.store
        .search(query, continueFrom, pick, sort)
      acc.push(...entities)
      continueFrom = next
    } while (continueFrom)

    return acc;
  }

  async pageThroughAllWithOwner(
    ownerId: string,
    query: Filter<TEntity> = {},
    pick?: Partial<Record<keyof TEntity, number>>,
    sort?: Partial<Record<keyof TEntity, SortDirection>>,
  ) {
    const acc: TEntity[] = []

    let continueFrom: string
    do {
      const { entities, next } = await this.store
        .searchWithOwner(ownerId, query, continueFrom, pick, sort)
      acc.push(...entities)
      continueFrom = next
    } while (continueFrom)

    return acc;
  }
}