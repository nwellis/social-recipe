import { InternalDomainError, OrgFileMetadata } from '@acme/core'
import { ApiClient } from './ApiClient'
import { tuple } from '@acme/util'

export interface UploadFile extends File {
  _id: string
  uploading: boolean
  error?: string
  previewUri?: string
}

export namespace UploadFile {
  export function decorateFile(
    file: File,
    { _id, ...data }: Partial<Exclude<UploadFile, keyof File>> = {},
  ): UploadFile {
    return Object.assign(file, {
      _id: _id || window.crypto.randomUUID(),
      uploading: false,
      error: undefined,
      previewUri: undefined,
      ...data,
    })
  }

  export async function uploadOrgFile(
    file: UploadFile
  ) {
    let metadata: OrgFileMetadata | undefined
    try {
      file.uploading = true

      metadata = await ApiClient.orgFile.createOrgFileMetadata.mutate({ contentType: file.type, byteSize: file.size })
      const s3Response = await fetch(metadata.url, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
          'x-amz-acl': 'public-read',
        },
        body: new Blob([file], { type: file.type }),
      })

      if (!s3Response.ok) {
        throw new InternalDomainError(await s3Response.text())
      }

      file.uploading = false
      return tuple(file, metadata)
    } catch (err) {
      file.uploading = false
      console.error(err)

      if (metadata) {
        await ApiClient.orgFile.deleteOrgFileMetadata
          .mutate(metadata._id)
          .catch(console.error)
      }

      throw err
    }
  }
}