import { queryOptions } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";

export const queryOrganization = (orgId: string) => queryOptions({
  queryKey: ['organization', orgId],
  queryFn: async () => ApiClient.org.getOrganization.query(orgId),
})