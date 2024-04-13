import { OrganizationService } from "@acme/server";
import { protectedProcedure } from "../TRPC.js";
import { t } from "../TRPC.js";
import { procedureAssert } from "../util/Procedure.js";
import { z } from "zod";

export const organizationRouter = t.router({
  getUserOrganization: protectedProcedure
    .query(async (opts) => {
      const organizations = await OrganizationService.Instance().getOrgs({ userId: opts.ctx.user.id })
      procedureAssert(organizations.length, 'NOT_FOUND')
      return organizations.at(0)
    }),
})