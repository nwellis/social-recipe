import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller()
export class MonitorController {
  constructor() { }

  @Get('health')
  // @HttpCode(204)
  health(): string {
    console.log(`RECIEVED`)
    return 'OK'
  }
}
