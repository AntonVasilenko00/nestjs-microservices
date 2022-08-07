import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getHello(): string {
    return `Hello from ${AuthService.name}!`;
  }

  async login(): Promise<any> {
    return {
      token: 'fake-token',
    };
  }
}
