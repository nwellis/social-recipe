import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@acme/router';
import { joinPaths } from '@acme/util';

export const ApiClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: joinPaths(import.meta.env.PUBLIC_API_URL, "/trpc/v1"),
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: 'include',
        });
      },
    }),
  ],
});