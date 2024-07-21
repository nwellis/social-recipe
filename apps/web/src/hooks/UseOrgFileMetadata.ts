import { OrgFileMetadata } from '@acme/core';
import { useQueries } from '@tanstack/react-query';
import { queryOrgFile } from 'lib/queries/OrgFileQueries';

export function useOrgFileMetadata(fileIds: string[]) {
  return useQueries({
    queries: fileIds.map(fileId => queryOrgFile(fileId)),
    combine: (progress) => {
      return progress.reduce<Record<string, OrgFileMetadata>>((acc, metadata) => {
        if (metadata.data) {
          acc[metadata.data._id] = metadata.data
        }
        return acc
      }, {})
    },
  })
}