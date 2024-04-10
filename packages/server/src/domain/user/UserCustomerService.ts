import { DatabaseEntityStore, OAuthAccount, Organization, UserCustomer } from "@acme/core";
import mem from "mem";
import { UserCustomerStore } from "../../store/UserCustomerStore.js";
import { OrganizationStore } from "../../store/OrganizationStore.js";

export class UserCustomerService {

  static Instance = mem(() => new UserCustomerService(UserCustomerStore, OrganizationStore))

  constructor(
    protected readonly user: DatabaseEntityStore<UserCustomer>,
    protected readonly organization: DatabaseEntityStore<Organization>,
  ) { }

  async getUser(id: string) {
    return this.user.findOne(id, { hashedPassword: 0, __version: 0 });
  }

  async initialUserSetup(user: UserCustomer) {
    await this.organization.set(user._id, {
      _id: user._id,
      __schema: 1,
      __version: 1,
    })
  }
}