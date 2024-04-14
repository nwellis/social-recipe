import { FolderService } from "@acme/server";
import { protectedProcedure } from "../TRPC.js";
import { t } from "../TRPC.js";
import { procedureAssert } from "../util/Procedure.js";
import { z } from "zod";

export const folderRouter = t.router({
  getFolder: protectedProcedure
    .input(z.string())
    .query(async (opts) => {
      const organization = await FolderService.Instance().getFolder(opts.input)
      procedureAssert(organization, 'NOT_FOUND')
      return organization
    }),

  getFolders: protectedProcedure
    .input(z.object({
      orgId: z.string(),
    }))
    .query(async (opts) => {
      const folders = await FolderService.Instance().getFolder(opts.input.orgId)
      return folders
    }),
})