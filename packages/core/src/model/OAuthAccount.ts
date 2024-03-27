import { ServerEntity } from "../index.js"

// TODO: const array OAuth class thingy?
export interface OAuthAccount extends ServerEntity {
  providerId: "GitHub"
  providerUserId: string
  userId: string
}