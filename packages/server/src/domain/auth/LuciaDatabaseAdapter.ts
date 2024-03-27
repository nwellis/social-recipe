
import { useMongo } from "../../db/Mongo.js";
import pMemoize from "p-memoize";
import { LuciaMongoDatabaseAdapter } from "./LuciaMongoDatabaseAdapter.js";
import { SessionCustomerStore } from "../../store/SessionCustomerStore.js";
import { UserCustomerStore } from "../../store/UserCustomerStore.js";
import { SessionAdminStore } from "../../store/SessionAdminStore.js";
import { UserAdminStore } from "../../store/UserAdminStore.js";
import { assert } from "ts-essentials";
import { MongoEntityStore } from "../../db/MongoEntityStore.js";
import { ensureMongoCollection } from "../../db/EnsureMongoCollection.js";
import type { Adapter } from "lucia";

const stores = {
  customer: { session: SessionCustomerStore, user: UserCustomerStore },
  admin: { session: SessionAdminStore, user: UserAdminStore },
} as const

export const useLuciaDatabaseAdapter = pMemoize(async (key: keyof typeof stores) => {
  const mongo = await useMongo()
  const { session, user } = stores[key]

  assert(session instanceof MongoEntityStore, "Expected session to be a MongoEntityStore")
  assert(user instanceof MongoEntityStore, "Expected user to be a MongoEntityStore")

  await Promise.all([
    ensureMongoCollection(session.options.name, mongo, session.options),
    ensureMongoCollection(user.options.name, mongo, user.options),
  ])

  return new LuciaMongoDatabaseAdapter(
    mongo.collection(session.options.name),
    mongo.collection(user.options.name),
  ) as Adapter
})