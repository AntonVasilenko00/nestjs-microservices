import { Injectable } from '@nestjs/common';

@Injectable()
export class PrimaryService {
  getHello(): string {
    return `Hello from ${PrimaryService.name}!`;
  }
}
