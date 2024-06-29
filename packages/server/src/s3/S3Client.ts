import { assert } from "ts-essentials";
import { S3Client as AWSS3Client } from "@aws-sdk/client-s3";
import { Logger } from '../Logger.js';
import { Settings } from '../Settings.js';

export const S3ClientInstance = (() => {
  try {
    const endpoint = Settings.S3.DoS3Endpoint
    const apiKey = Settings.S3.DoS3ApiKey
    const apiSecret = Settings.S3.DoS3ApiSecret

    assert(typeof endpoint === "string", `500|S3EndpointMustBeANonEmptyString`)
    assert(typeof apiKey === "string", `500|S3ApiKeyMustBeANonEmptyString`)
    assert(typeof apiSecret === "string", `500|S3ApiSecretMustBeANonEmptyString`)

    // https://docs.digitalocean.com/products/spaces/reference/s3-sdk-examples/#configure-a-client
    const client = new AWSS3Client({
      endpoint,
      region: "us-east-1", // Doesn't matter, just to appease the SDK its not used
      forcePathStyle: false,
      credentials: {
        accessKeyId: apiKey,
        secretAccessKey: apiSecret,
      },
    })
    Logger.info(`201|S3Client|endpoint#${endpoint}`)

    return client

  } catch (err) {
    Logger.error(`500|S3Client|FailedToInitialize|msg#${err?.message}`, err)
    throw err
  }
})()
