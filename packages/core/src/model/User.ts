import { ServerEntityManaged } from "../entity/ServerEntity.js"

export interface User extends ServerEntityManaged {
  /**
   * User's hashed password, null if the user is using OAuth only
   */
  hashedPassword?: string

  email: string
  emailVerified: boolean
}

export interface UserCustomer extends User { }
export interface UserAdmin extends User { }