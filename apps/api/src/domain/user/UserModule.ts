import { DatabaseEntityStore, UserCustomer } from "@acme/core";
import { UserCustomerService, UserCustomerStore } from "@acme/server";
import { Module } from "@nestjs/common";
import { UserController } from "./UserController.js";


@Module({
    controllers: [UserController],
    providers: [
        UserCustomerService,
        {
            provide: DatabaseEntityStore<UserCustomer>,
            useValue: UserCustomerStore,
        },
    ]
})
export class UserModule { }