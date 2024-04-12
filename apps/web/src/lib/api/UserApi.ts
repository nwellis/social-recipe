import { HttpError, UserCustomer } from "@acme/core"
import { apiV1Host } from "."

export async function getSelf(): Promise<UserCustomer> {
  const response = await fetch(`${apiV1Host}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  await HttpError.throwIfNotOk(response)
  return response.json()
}