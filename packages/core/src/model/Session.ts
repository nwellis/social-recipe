import { ServerEntity } from "../entity/ServerEntity.js"

export interface Session extends ServerEntity {
  expiresAt: string
  userId: string
  scopes: string[]
}

export interface SessionCustomer extends Session {
  orgId: string
}
export interface SessionAdmin extends Session { }