import { Module } from '@nestjs/common';
import { AuthModule } from './domain/auth/AuthModule.js';
import { UserModule } from './domain/user/UserModule.js';
import { MonitorModule } from './domain/monitor/MonitorModule.js';

@Module({
  imports: [
    AuthModule,
    MonitorModule,
    UserModule,
  ],
  providers: [],
})
export class AppModule { }
