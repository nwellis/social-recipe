import { DatabaseEntityStore, OAuthAccount, Organization, UserCustomer } from "@acme/core";
import { OAuth2Service, UserCustomerService, UserCustomerStore, OrganizationStore } from "@acme/server";
import { Module } from "@nestjs/common";


@Module({
    providers: [
        UserCustomerService,
        OAuth2Service,
        {
            provide: DatabaseEntityStore<OAuthAccount>,
            useValue: UserCustomerStore,
        },
        {
            provide: DatabaseEntityStore<UserCustomer>,
            useValue: UserCustomerStore,
        },
        {
            provide: DatabaseEntityStore<Organization>,
            useValue: OrganizationStore,
        },
    ]
})
export class AuthModule { }