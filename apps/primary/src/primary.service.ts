import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PrimaryService {
  constructor(
    @Inject('AUTH')
    private authClient: ClientProxy,
  ) {}
  getHello(): string {
    return `Hello from ${PrimaryService.name}!`;
  }
}
