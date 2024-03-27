import { DatabaseEntityStore, OAuthAccount, User } from "@acme/core";
import mem from "mem";
import { UserCustomerStore } from "../../store/UserCustomerStore.js";
import { OAuthAccountCustomerStore } from "../../store/OAuthAccountCustomerStore.js";
import { generateId } from "lucia";

export class OAuth2Service<U extends User> {

  static getForCustomer = mem(() => new OAuth2Service(UserCustomerStore, OAuthAccountCustomerStore))

  constructor(
    protected readonly user: DatabaseEntityStore<U>,
    protected readonly account: DatabaseEntityStore<OAuthAccount>,
  ) { }

  createUserId() {
    return generateId(15);
  }

  async getUser(account: Pick<OAuthAccount, "providerId" | "providerUserId">) {
    const results = await this.account.search({
      providerId: account.providerId,
      providerUserId: account.providerUserId,
    });
    if (results.entities.length === 0) return;

    return this.user.findOne(results.entities[0].userId);
  }

  async createUser(
    payload: U,
    account: Pick<OAuthAccount, "providerId" | "providerUserId">
  ) {
    await this.user.set(payload._id, payload);

    const oAuthId = `${account.providerId}:${payload._id}`;
    await this.account.set(`${account.providerId}:${payload._id}`, {
      _id: oAuthId,
      userId: payload._id,
      ...account,
    })
  }

}