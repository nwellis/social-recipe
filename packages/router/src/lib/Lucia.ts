import type { UserCustomer } from "@acme/core"
import { useLuciaDatabaseAdapter } from "@acme/server"
import { ServerEnv } from '@acme/server-env';
import { Lucia } from "lucia"

export const lucia = new Lucia(
  await useLuciaDatabaseAdapter("customer"),
  {
    sessionCookie: {
      attributes: {
        secure: ServerEnv.Https,
      },
    },
    getUserAttributes: (attributes) => {
      return {
        hashedPassword: attributes.hashedPassword,
        email: attributes.email,
        emailVerified: attributes.emailVerified,
      }
    }
  }
)

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: Omit<UserCustomer, "_id">
  }
}