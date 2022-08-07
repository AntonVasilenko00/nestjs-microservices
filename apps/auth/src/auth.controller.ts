import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from './users/users.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() { user }: { user: User }): Promise<string> {
    return await this.authService.login(user);
  }
}
