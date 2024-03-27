import { DatabaseEntityStore, OAuthAccount, UserCustomer } from "@acme/core";
import mem from "mem";
import { UserCustomerStore } from "../../store/UserCustomerStore.js";

export class UserCustomerService {

  static Instance = mem(() => new UserCustomerService(UserCustomerStore))

  constructor(
    protected readonly user: DatabaseEntityStore<UserCustomer>,
  ) { }

  async getUser(id: string) {
    return this.user.findOne(id, { hashedPassword: 0, __version: 0 });
  }
}