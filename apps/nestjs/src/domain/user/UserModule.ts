import { DatabaseEntityStore, UserCustomer } from "@acme/core";
import { UserCustomerService, UserCustomerStore } from "@acme/server";
import { Module } from "@nestjs/common";


@Module({
    providers: [
        UserCustomerService,
        {
            provide: DatabaseEntityStore<UserCustomer>,
            useValue: UserCustomerStore,
        },
    ]
})
export class UserModule {}