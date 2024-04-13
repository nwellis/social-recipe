import { Router } from "express";
import { mkAuthForCustomerGitHubRouter } from "./AuthGitHub.js";

export async function mkAuthRouter() {
  const router = Router()

  router.use(
    "/github",
    await mkAuthForCustomerGitHubRouter()
  )

  return router
}