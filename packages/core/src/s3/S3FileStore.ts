export type PresignedUrlOptions = {
  acl: "public-read" | "private"
}

export abstract class S3FileStore<TData> {
  abstract has(key: string): Promise<false | { contentType?: string, contentLength: number }>
  abstract get(key: string): Promise<TData | undefined>
  abstract set(key: string, data: TData): Promise<void>
  abstract unset(key: string): Promise<void>
}

export abstract class S3FileStoreWithUpload<TData> extends S3FileStore<TData> {
  abstract createUploadUrl(
    key: string,
    options: PresignedUrlOptions,
  ): Promise<{ presignedUrl: string, fileUrl: string }>
}