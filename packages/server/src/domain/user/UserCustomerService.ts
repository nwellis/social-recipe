import { DatabaseEntityStore, ServerEntityManaged, UserCustomer } from "@acme/core";
import mem from "mem";
import { UserCustomerStore } from "../../store/UserCustomerStore.js";
import { generateId } from "lucia";
import { OrganizationService } from "../org/OrganizationService.js";

export class UserCustomerService {

  static Instance = mem(() => new UserCustomerService(UserCustomerStore, OrganizationService.Instance()))

  constructor(
    protected readonly user: DatabaseEntityStore<UserCustomer>,
    protected readonly organization: OrganizationService,
  ) { }

  createUserId() {
    return generateId(15);
  }

  async getUser(id: string) {
    return this.user.findOne(id, { hashedPassword: 0, __version: 0, __schema: 0 });
  }

  async createUser(payload: Omit<UserCustomer, keyof ServerEntityManaged>) {
    const user: UserCustomer = {
      ...payload,
      _id: this.createUserId(),
      __schema: 1,
      __version: 1,
      createdAt: Date.now(),
    }

    await this.user.set(user._id, user);
    const org = await this.initialUserSetup(user);

    return { user, org };
  }

  async initialUserSetup(user: UserCustomer) {
    return this.organization.createOrg({
      userId: user._id,
    })
  }
}