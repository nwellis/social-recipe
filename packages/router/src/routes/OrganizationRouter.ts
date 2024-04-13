import { OrganizationService } from "@acme/server";
import { protectedProcedure } from "../TRPC.js";
import { t } from "../TRPC.js";
import { procedureAssert } from "../util/Procedure.js";
import { z } from "zod";

export const organizationRouter = t.router({
  getOrganization: protectedProcedure
    .input(z.string())
    .query(async (opts) => {
      const organization = await OrganizationService.Instance().getOrg(opts.input)
      procedureAssert(organization, 'NOT_FOUND')
      return organization
    }),

  getUserOrganizations: protectedProcedure
    .input(z.string())
    .query(async (opts) => {
      const organizations = await OrganizationService.Instance().getOrgs({ userId: opts.input })
      procedureAssert(organizations.length, 'NOT_FOUND')
      return organizations
    }),
})