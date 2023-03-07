/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getMyMessage(message: number): string {
    return `My message is ${message}`;
  }
}
