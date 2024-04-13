import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { mkAuthRouter } from './routes/Auth.js';
import { ErrorMiddleware } from './middleware/ErrorMiddleware.js';
import { ServerEnv } from '@acme/server-env';
import cookieParser from 'cookie-parser';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter, createAppRouterContext } from '@acme/router'


export async function createServer() {
  const app = express();

  if (ServerEnv.Server.CORS.enabled) {
    app.use(cors({
      origin: ServerEnv.Server.CORS.origin,
      credentials: true,
    }));
  }

  app
    .disable('x-powered-by')
    .use(morgan('dev'))
    .use(cookieParser())
    .get('/health', (_req, res) => res.json({ ok: true }))
    .use('/api/v1/auth', await mkAuthRouter())
    .use(ErrorMiddleware);

  app.use('/trpc/v1', trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: createAppRouterContext,
  }))

  return app;
};
