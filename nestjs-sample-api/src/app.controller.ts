import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  @Get('/')
  getMyMessage(): string {
    const port = this.configService.get<number>('PORT');
    return this.appService.getMyMessage(port);
  }
}
