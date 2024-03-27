import { Module } from '@nestjs/common';
import { AuthController } from './domain/auth/AuthController.js';
import { UserController } from './domain/user/UserController.js';

@Module({
  imports: [],
  controllers: [
    AuthController,
    UserController,
  ],
  providers: [],
})
export class AppModule {}
