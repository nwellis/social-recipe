import { Controller, Get } from '@nestjs/common';
import { UserCustomerService } from '@acme/server';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserCustomerService
  ) {}

  @Get()
  getHello() {
    return this.userService.getUser("xxxx");
  }
}
