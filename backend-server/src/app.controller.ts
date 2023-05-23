import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  get(): string {
    return 'Health checker';
  }

  @Get('/favicon.ico')
  get2(): string {
    return 'Health checker';
  }
}
