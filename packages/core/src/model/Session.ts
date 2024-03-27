import { ServerEntity } from "../entity/ServerEntity.js"

export interface Session extends ServerEntity {
  expiresAt: string
  userId: string
}

export interface SessionCustomer extends Session { }
export interface SessionAdmin extends Session { }