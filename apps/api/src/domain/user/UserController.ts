import { Controller, UseGuards, Get, Req, Param } from '@nestjs/common';
import { UserCustomerService } from '@acme/server';
import type { Request } from '../../Framework.js'
import { AuthGuard } from '../../guard/AuthGuard.js';
import { DatabaseEntityStore, UserCustomer } from '@acme/core';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(
    private readonly userService: UserCustomerService,
  ) { }

  @Get()
  findCurrent(
    @Req() request: Request
  ) {
    return this.userService.getUser(request.session.userId);
  }

  @Get(':id')
  find(
    @Param('id') id: string
  ) {
    return this.userService.getUser(id);
  }
}
