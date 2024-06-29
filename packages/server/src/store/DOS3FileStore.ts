import { CreateBucketCommand, DeleteObjectCommand, GetObjectCommand, HeadBucketCommand, HeadObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { S3FileStoreWithUpload } from "@acme/core";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Logger } from '../Logger.js';
import { PresignedUrlOptions } from '@acme/core';
import { lgm } from '@acme/logger';

export class DOS3FileStore extends S3FileStoreWithUpload<string> {

  static readonly Defaults: {
    MinImageSize: 0,
    MaxImageSize: 20971520, // 20 mb
  }

  readonly bucketInit: Promise<void>

  constructor(
    readonly s3Client: S3Client,
    readonly bucket: string,
  ) {
    super()

    this.bucketInit = (async () => {
      try {
        await s3Client.send(new HeadBucketCommand({ Bucket: bucket }))
      } catch (headError) {
        switch (headError.name) {
          case "NotFound": {
            Logger.info(`102|CreatingImagesBucket|bucket#${bucket}`)
            try {
              await this.s3Client.send(new CreateBucketCommand({ Bucket: bucket }))
              Logger.info(`201|CreateImagesBucket|bucket#${bucket}`)
            } catch (createErr) {
              Logger.error(`500|CreateImagesBucket|bucket#${bucket}|code#${createErr.name || "UNKNOWN"}`, createErr)
            }
            break;
          }

          default:
            Logger.error(`500|HasImagesBucket|bucket#${bucket}|code#${headError.name || "UNKNOWN"}`, headError)
            break;
        }
      }
    })()
  }

  /**
   * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-s3-request-presigner/
   */
  async createUploadUrl(
    key: string,
    options: PresignedUrlOptions,
  ) {
    try {
      const url = await getSignedUrl(
        this.s3Client,
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: key,
          ACL: options.acl,
        }),
        {
          expiresIn: 3_600,
        }
      )

      return {
        presignedUrl: url,
        // Presign URL has a bunch of temporary query params that we wont need for referencing the file for later
        fileUrl: url.split("?").at(0),
      }
    } catch (err) {
      Logger.error(`500|ImageStorePresignedUrl|key#${key}|msg#${err?.message}`, err)
      throw err
    }
  }

  async has(key: string) {
    try {
      const data = await this.s3Client.send(new HeadObjectCommand({
        Key: key,
        Bucket: this.bucket,
      }))

      return data.ContentLength > 0 ? {
        contentType: data.ContentType,
        contentLength: data.ContentLength,
      } : false
    } catch (err) {
      switch (err.code) {
        case "NotFound":
          return false
        case "NoSuchKey":
          return false
      }

      Logger.error(`500|ImageStoreHasFailed|key#${key}|msg#${err?.message}`, err)
      return false
    }
  }

  async get(key: string) {
    try {
      const data = await this.s3Client.send(new GetObjectCommand({
        Key: key,
        Bucket: this.bucket,
      }))

      return data.Body?.transformToString()
    } catch (err) {
      switch (err.code) {
        case "NotFound":
          return undefined
        case "NoSuchKey":
          return undefined
      }

      Logger.error(`500|ImageStoreSetFailed|key#${key}|msg#${err?.message}`, err)
      throw err
    }
  }

  async set(key: string, data: string) {
    try {
      await this.s3Client.send(new PutObjectCommand({
        Key: key,
        Bucket: this.bucket,
        ACL: "private",
        Body: data,
      }))
    } catch (err) {
      Logger.error(`500|ImageStoreSetFailed|key#${key}|msg#${err?.message}`, err)
      throw err
    }
  }

  async unset(key: string) {
    if (key.startsWith("static")) {
      Logger.error(lgm(500, "ImageStoreDelete", {
        key,
        message: "Images within the static folder cannot be deleted",
      }))
      return
    }
    try {
      await this.s3Client.send(new DeleteObjectCommand({
        Key: key,
        Bucket: this.bucket,
      }))
    } catch (err) {
      Logger.error(lgm(500, "ImageStoreUnsetFailed", { key, message: err?.message }), err)
      throw err
    }
  }
}