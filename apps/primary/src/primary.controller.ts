import { JwtAuthGuard } from '@app/common';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { PrimaryService } from './primary.service';

@Controller()
export class PrimaryController {
  constructor(private readonly primaryService: PrimaryService) {}

  @Get()
  getHello(): string {
    return this.primaryService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/private')
  getPrivateHello(): string {
    return this.primaryService.getHello();
  }
}
