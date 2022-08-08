import { Controller, Get, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from './users/decorators/current-user.decorator';
import { User } from './users/users.schema';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

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

  @UseGuards(JwtAuthGuard)
  @MessagePattern('validate_user')
  async validateUser(@CurrentUser() user): Promise<string> {
    console.log('validate user');
    this.logger.log(`validateUser: ${JSON.stringify(user)}`);
    return user;
  }
}
