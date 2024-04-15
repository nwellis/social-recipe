import { Filter, SortDirection } from "mongodb"
import { ServerEntity } from "./ServerEntity.js"
import { DatabaseEntityPatch } from "./DatabaseEntityPatch.js"
import { Cursor } from "./Cursor.js"
import { DatabaseEntityInsert } from "./DatabaseEntityInsert.js"
import { PartialRecord } from "@acme/util"

export abstract class DatabaseEntityStore<TEntity extends ServerEntity> {

  abstract findOne(id: string, pick?: PartialRecord<keyof TEntity, number>): Promise<TEntity>;
  abstract findOneWithOwner(ownerId: string, id: string, pick?: PartialRecord<keyof TEntity, number>): Promise<TEntity>;

  abstract findMany(ids: string[], pick?: PartialRecord<keyof TEntity, number>): Promise<TEntity[]>;
  abstract findManyWithOwner(ownerId: string, ids: string[], pick?: PartialRecord<keyof TEntity, number>): Promise<TEntity[]>;

  abstract search(query: Filter<TEntity>, next?: string, pick?: PartialRecord<keyof TEntity, number>, sort?: PartialRecord<keyof TEntity, SortDirection>): Promise<Cursor<TEntity>>;
  abstract searchWithOwner(ownerId: string, query: Filter<TEntity>, next?: string, pick?: PartialRecord<keyof TEntity, number>, sort?: PartialRecord<keyof TEntity, SortDirection>): Promise<Cursor<TEntity>>;

  abstract allWithOwner(ownerId: string): Promise<TEntity[]>
  abstract firstWithOwner(ownerId: string, query?: Filter<TEntity>): Promise<TEntity>

  abstract set(id: string, entity: TEntity, filter?: Filter<TEntity>): Promise<number>;
  abstract setMany(inserts: DatabaseEntityInsert<TEntity>[]): Promise<number>;
  abstract patch(id: string, patch: Partial<TEntity>, filter?: Filter<TEntity>): Promise<number>;
  abstract patchMany(patches: DatabaseEntityPatch<TEntity>[]): Promise<number>;

  abstract delete(id: string): Promise<number>;
  abstract deleteMany(ids: string[]): Promise<number>;
}