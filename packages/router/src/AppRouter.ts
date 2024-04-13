import { t } from './TRPC.js';
import { authRouter } from './routes/AuthRouter.js';
import { userCustomerRouter } from './routes/UserCustomerRouter.js';

export const appRouter = t.router({
  auth: authRouter,
  user: userCustomerRouter,
});

export type AppRouter = typeof appRouter;