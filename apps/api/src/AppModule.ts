import { Module } from '@nestjs/common';
import { AuthController } from './domain/auth/AuthController.js';
import { UserController } from './domain/user/UserController.js';
import { MonitorController } from './domain/monitor/MonitorController.js';

@Module({
  imports: [],
  controllers: [
    AuthController,
    MonitorController,
    UserController,
  ],
  providers: [],
})
export class AppModule { }
