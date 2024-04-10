import { DatabaseEntityStore, Organization, UserCustomer } from "@acme/core";
import mem from "mem";
import { UserCustomerStore } from "../../store/UserCustomerStore.js";
import { OrganizationStore } from "../../store/OrganizationStore.js";
import { generateId } from "lucia";

export class UserCustomerService {

  static Instance = mem(() => new UserCustomerService(UserCustomerStore, OrganizationStore))

  constructor(
    protected readonly user: DatabaseEntityStore<UserCustomer>,
    protected readonly organization: DatabaseEntityStore<Organization>,
  ) { }

  createUserId() {
    return generateId(15);
  }

  async getUser(id: string) {
    return this.user.findOne(id, { hashedPassword: 0, __version: 0 });
  }

  async createUser(payload: Omit<UserCustomer, "_id">) {
    const user = {
      ...payload,
      _id: this.createUserId(),
    }
    await this.user.set(user._id, user);
    await this.initialUserSetup(user);

    return user;
  }

  async initialUserSetup(user: UserCustomer) {
    await this.organization.set(user._id, {
      _id: user._id,
      __schema: 1,
      __version: 1,
    })
  }
}