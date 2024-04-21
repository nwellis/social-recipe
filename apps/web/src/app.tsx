import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { QueryClientProvider } from '@tanstack/react-query'
import { AppQueryClient } from 'lib/AppQueryClient'
import { initIcons } from '@acme/ui/components'
import './index.css'

initIcons()

// Set up a Router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient: AppQueryClient,
  },
  defaultPreload: 'intent',
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('app')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <QueryClientProvider client={AppQueryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  )
}