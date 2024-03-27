import { Db, IndexDescription, IndexDirection } from "mongodb";
import { AppConfig, type ServerEntity } from "@acme/core";
import pMemoize from "p-memoize";
import { Logger } from "../Logger.js";

export class CollectionOptions<TEntity extends ServerEntity> {
  readonly prefix = AppConfig.Prefix.toLowerCase()
  readonly name: string

  constructor(
    name: string,
    readonly ownerIdField: keyof TEntity,
    readonly indexes = Array.of<IndexDescription & { key: Partial<{ [TProp in keyof TEntity]: IndexDirection }> }>(),
  ) {
    this.name = `${this.prefix}_${name}`
  }
}

export const ensureMongoCollection = pMemoize(
  async <TEntity extends ServerEntity>(key: string, db: Db, options: CollectionOptions<TEntity>) => {

    const collection = db.collection(key);
    const collections = await db.listCollections().toArray();

    if (!collections.some(({ name }) => name === options.name)) {
      Logger.info(`102|CreateMongoCollection|key#${key}|name#${options.name}`)
      await db.createCollection(options.name, {});
    }

    const indexes = await collection.listIndexes().toArray();
    const descriptions = options.indexes.filter(next => indexes.every(({ name }) => name !== next.name))
    for (const desc of descriptions) {
      const { key: indexKey, ...more } = desc
      Logger.info(`102|CreateMongoIndex|key#${key}|collection#${options.name}|index#${more.name}|unique#${more.unique ?? false}`)
      await collection.createIndex(indexKey, {
        name: more.name,
        unique: more.unique
      })
    }
  }
)