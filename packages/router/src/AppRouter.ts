import { t } from './TRPC.js';
import { authRouter } from './routes/AuthRouter.js';
import { folderRouter } from './routes/FolderRouter.js';
import { orgFileRouter } from './routes/OrgFileRouter.js';
import { organizationRouter } from './routes/OrganizationRouter.js';
import { recipeRouter } from './routes/RecipeRouter.js';
import { userCustomerRouter } from './routes/UserCustomerRouter.js';

export const appRouter = t.router({
  auth: authRouter,
  folder: folderRouter,
  org: organizationRouter,
  orgFile: orgFileRouter,
  recipe: recipeRouter,
  user: userCustomerRouter,
});

export type AppRouter = typeof appRouter;