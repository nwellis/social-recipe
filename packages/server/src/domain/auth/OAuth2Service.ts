import { DatabaseEntityStore, OAuthAccount } from "@acme/core";
import mem from "mem";
import { OAuthAccountCustomerStore } from "../../store/OAuthAccountCustomerStore.js";

export class OAuth2Service {

  static CustomerInstance = mem(() => new OAuth2Service(OAuthAccountCustomerStore))

  constructor(
    protected readonly account: DatabaseEntityStore<OAuthAccount>,
  ) { }

  async getOAuthAccount(account: Pick<OAuthAccount, "providerId" | "providerUserId">) {
    const results = await this.account.search({
      providerId: account.providerId,
      providerUserId: account.providerUserId,
    });

    return results.entities[0];
  }

  async createOAuthAccount(
    userId: string,
    account: Pick<OAuthAccount, "providerId" | "providerUserId">
  ) {
    const oAuthId = `${account.providerId}:${userId}`;
    await this.account.set(oAuthId, {
      _id: oAuthId,
      userId: userId,
      ...account,
    })
  }
}