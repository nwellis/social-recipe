import { queryOptions } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";

export const querySession = queryOptions({
  queryKey: ['session'],
  queryFn: () => ApiClient.auth.getSession.query(),
  staleTime: Infinity, // Session observer will invalidate on expiration
})