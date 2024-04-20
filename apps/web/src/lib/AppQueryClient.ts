import { QueryClient, QueryObserver } from "@tanstack/react-query";
import { querySession } from './queries/AuthQueries';
import ms from 'ms';

export const AppQueryClient = new QueryClient()

new QueryObserver(AppQueryClient, { queryKey: querySession.queryKey, queryFn: querySession.queryFn }).subscribe((result) => {
  if (!result.data) return

  const expiresIn = new Date(result.data.expiresAt).valueOf() - Date.now()
  if (expiresIn > ms('12h')) return // note: set timeout rolls over to 1 beyond 24.8 days in ms

  setTimeout(() => {
    console.debug(`SESSION-EXPIRED`, result.data)
    AppQueryClient.invalidateQueries({ queryKey: querySession.queryKey })
  }, Math.max(0, expiresIn))
})