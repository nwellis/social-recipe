export const Settings = {
  NodeEnv: process.env.NODE_ENV as "development" | "production",
  Https: process.env.NODE_ENV === "production",

  Server: {
    CORS: {
      enabled: Boolean(process.env.CORS_ORIGIN),
      origin: (process.env.CORS_ORIGIN || "").split(",")
    }
  },

  Origin: {
    Web: process.env.PUBLIC_WEB_URL,
    Api: process.env.PUBLIC_API_URL,
  },

  Mongo: {
    URI: process.env.MONGODB_URI,
    Name: process.env.MONGODB_NAME,
  },

  S3: {
    DoS3Endpoint: process.env.DO_S3_ENDPOINT,
    DoS3ApiKey: process.env.DO_S3_APIKEY,
    DoS3ApiSecret: process.env.DO_S3_APISECRET,
  },

  OAuth: {
    GitHub: {
      ClientID: process.env.GITHUB_CLIENT_ID,
      ClientSecret: process.env.GITHUB_CLIENT_SECRET,
    }
  }
} as const