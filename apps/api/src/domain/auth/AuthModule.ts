import { DatabaseEntityStore, OAuthAccount, Organization, UserCustomer } from "@acme/core";
import { OAuth2Service, UserCustomerService, UserCustomerStore, OrganizationStore } from "@acme/server";
import { Module } from "@nestjs/common";
import { OAuth2Providers } from "./OAuth2Providers.js";
import { AuthController } from "./AuthController.js";


@Module({
    controllers: [AuthController],
    providers: [
        UserCustomerService,
        OAuth2Service,
        OAuth2Providers,
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
    ],
})
export class AuthModule { }