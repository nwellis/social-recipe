import { FolderService } from "@acme/server";
import { protectedProcedure } from "../TRPC.js";
import { t } from "../TRPC.js";
import { procedureAssert } from "../util/Procedure.js";
import { z } from "zod";

export const folderRouter = t.router({
  getFolder: protectedProcedure
    .input(z.string())
    .query(async (opts) => {
      const folder = await FolderService.Instance().getFolder(opts.input)
      procedureAssert(folder, 'NOT_FOUND')
      return folder
    }),

  getFolders: protectedProcedure
    .input(z.object({
      orgId: z.string(),
    }))
    .query(async (opts) => {
      const folders = await FolderService.Instance().getFolder(opts.input.orgId)
      return folders
    }),

  deleteFolder: protectedProcedure
    .input(z.string())
    .query(async (opts) => {
      const folder = await FolderService.Instance().getFolder(opts.input)
      procedureAssert(folder, 'NOT_FOUND')
      procedureAssert(folder.orgId === opts.ctx.session.orgId, 'FORBIDDEN')
      procedureAssert(folder.permanent !== true, 'BAD_REQUEST')

      await FolderService.Instance().deleteFolder(opts.input)
      return folder
    }),
})