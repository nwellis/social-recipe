// https://www.mongodb.com/developer/languages/javascript/nextjs-with-mongodb/

import {
  MongoClient,
  type MongoClientOptions,
} from 'mongodb';
import pRetry from 'p-retry';
import { lgm } from '@acme/logger';
import { Logger } from '../Logger.js';
import { delay } from '@acme/util';
import { ServerEnv } from '@acme/server-env';
import { assert } from 'ts-essentials';

const MONGO_LOCAL_DEV_ENV = ServerEnv.NodeEnv === 'development'
const MONGO_RETRY_ATTEMPTS = MONGO_LOCAL_DEV_ENV ? 1 : 3
const MONGO_CLIENT_OPTIONS: MongoClientOptions = {
  connectTimeoutMS: 60_000, // default 30_000
}

assert(ServerEnv.Mongo.URI, 'Invalid/Missing environment variable: "MONGODB_URI"');
assert(ServerEnv.Mongo.Name, 'Invalid/Missing environment variable: "MONGODB_NAME"');

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(ServerEnv.Mongo.URI, MONGO_CLIENT_OPTIONS);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(ServerEnv.Mongo.URI, MONGO_CLIENT_OPTIONS);
  clientPromise = pRetry(
    async (attemptCount) => {
      if (attemptCount > 1) {
        Logger.warn(lgm(503, `MongoConnectRetryAttempt`, { attemptCount }))
        await delay(800 * attemptCount)
      }
      return client.connect();
    },
    {
      retries: MONGO_RETRY_ATTEMPTS,
      onFailedAttempt: (error) => {
        if (error.retriesLeft === 0) {
          Logger.error(lgm(503, `MongoConnectFailed`, {
            attemptCount: error.attemptNumber,
            message: error.message,
          }));
        }
      },
    },
  );
}

export async function useMongo() {
  return (await clientPromise).db(ServerEnv.Mongo.Name);
}

// export const useMongo = pMemoize(async () => {
//   const client = new MongoClient(Settings.Mongo.URI);
//
//   await client.connect();
//
//   const db = client.db(Settings.Mongo.NAME);
//
//   return db;
// })