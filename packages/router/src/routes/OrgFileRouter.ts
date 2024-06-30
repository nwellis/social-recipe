import { OrganizationFileService } from "@acme/server";
import { protectedProcedure, publicProcedure } from "../TRPC.js";
import { t } from "../TRPC.js";
import { procedureAssert } from "../util/Procedure.js";
import { z } from "zod";

export const orgFileRouter = t.router({
  getOrgFileMetadata: publicProcedure
    .input(z.string())
    .query(async (opts) => {
      const metadata = await OrganizationFileService.Instance().getOrgFileMetadata(opts.input)
      procedureAssert(metadata, 'NOT_FOUND')
      return metadata
    }),

  getOrgFileMetadatas: publicProcedure
    .input(z.object({
      orgId: z.string(),
    }))
    .query(async (opts) => {
      const metadatas = await OrganizationFileService.Instance().getOrgFileMetadatas(opts.input)
      return metadatas
    }),

  createOrgFileMetadata: protectedProcedure
    .input(z.object({
      orgId: z.string(),
      contentType: z.string(),
      byteSize: z.number().min(1),
    }))
    .mutation(async (opts) => {
      procedureAssert(opts.input.orgId === opts.ctx.session.orgId, 'FORBIDDEN')

      const metadata = await OrganizationFileService.Instance()
        .createOrgFileMetadata({ ...opts.input, orgId: opts.input.orgId })
      return metadata
    }),

  deleteOrgFileMetadata: protectedProcedure
    .input(z.string())
    .mutation(async (opts) => {
      const metadata = await OrganizationFileService.Instance().getOrgFileMetadata(opts.input)
      procedureAssert(metadata.orgId === opts.ctx.session.orgId, 'FORBIDDEN')

      return metadata
    }),
})