import { Injectable } from '@nestjs/common';
import { Message } from '@itopplus/api-interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to Nest api!' };
  }
}
