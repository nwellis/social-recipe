import {
  Outlet,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export interface AppRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<AppRouterContext>()({
  component: RootComponent,
})

function RootComponent() {

  return (
    <>
      <Outlet />
      <ReactQueryDevtools buttonPosition="top-right" />
      {/* <TanStackRouterDevtools position="bottom-right" /> */}
    </>
  )
}
