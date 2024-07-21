import { queryOptions } from "@tanstack/react-query";
import { ApiClient } from "../ApiClient";

export const queryOrgFile = (fileId: string) => queryOptions({
  queryKey: ['org-file', fileId],
  queryFn: async () => ApiClient.orgFile.getOrgFileMetadata.query(fileId),
  enabled: Boolean(fileId),
  staleTime: Infinity,
})