import { DatabaseEntityStore, OAuthAccount, UserCustomer } from "@acme/core";
import { OAuth2Service, UserCustomerStore } from "@acme/server";
import { Module } from "@nestjs/common";


@Module({
    providers: [
        OAuth2Service,
        {
            provide: DatabaseEntityStore<OAuthAccount>,
            useValue: UserCustomerStore,
        },
        {
            provide: DatabaseEntityStore<UserCustomer>,
            useValue: UserCustomerStore,
        },
    ]
})
export class AuthModule {}