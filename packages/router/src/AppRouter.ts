import { t } from './TRPC.js';
import { authRouter } from './routes/AuthRouter.js';
import { organizationRouter } from './routes/OrganizationRouter.js';
import { userCustomerRouter } from './routes/UserCustomerRouter.js';

export const appRouter = t.router({
  auth: authRouter,
  org: organizationRouter,
  user: userCustomerRouter,
});

export type AppRouter = typeof appRouter;