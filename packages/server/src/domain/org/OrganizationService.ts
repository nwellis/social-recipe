import { DatabaseEntityStore, Organization, ServerEntityManaged, UserCustomer } from "@acme/core";
import mem from "mem";
import { OrganizationStore } from "../../store/OrganizationStore.js";
import { generateId } from "lucia";

export class OrganizationService {

  static Instance = mem(() => new OrganizationService(OrganizationStore))

  constructor(
    protected readonly organization: DatabaseEntityStore<Organization>,
  ) { }

  createOrgId() {
    return generateId(15);
  }

  async getOrg(id: string) {
    return this.organization.findOne(id);
  }

  async getOrgs(query: { userId: string }) {
    const usersOrgs = await this.organization.allWithOwner(query.userId)
    return usersOrgs.slice().sort((a, b) => a.createdAt - b.createdAt)
  }

  async createOrg(payload: Omit<Organization, keyof ServerEntityManaged>) {
    const org: Organization = {
      ...payload,
      _id: this.createOrgId(),
      __schema: 1,
      __version: 1,
      createdAt: Date.now(),
    }

    await this.organization.set(org._id, org);

    return org;
  }
}