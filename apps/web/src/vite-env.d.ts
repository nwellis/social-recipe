/// <reference types="vite/client" />

export global {
  interface ImportMetaEnv {
    VITE_DO_S3_ENDPOINT: string
  }
}