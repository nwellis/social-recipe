import { redirect } from "@tanstack/react-router"
import { RouterContext } from "./RouterContext"
import { querySelf } from "./queries/UserQueries"

export async function isAuthenticatedOrRedirect({ context }: { context: RouterContext }) {
  try {
    await context.queryClient.ensureQueryData(querySelf)
  } catch (error) {
    throw redirect({
      to: '/login',
      search: {
        // Use the current location to power a redirect after login
        // (Do not use `router.state.resolvedLocation` as it can
        // potentially lag behind the actual current location)
        redirect: location.href,
      },
    })
  }
}