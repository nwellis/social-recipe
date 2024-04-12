import { Module } from '@nestjs/common';
import { AuthController } from './domain/auth/AuthController.js';
import { UserController } from './domain/user/UserController.js';
import { MonitorController } from './domain/monitor/MonitorController.js';
import { AuthModule } from './domain/auth/AuthModule.js';
import { UserModule } from './domain/user/UserModule.js';
import { MonitorModule } from './domain/monitor/MonitorModule.js';

@Module({
  imports: [
    AuthModule,
    MonitorModule,
    UserModule,
  ],
  controllers: [
    AuthController,
    MonitorController,
    UserController,
  ],
  providers: [],
})
export class AppModule { }
