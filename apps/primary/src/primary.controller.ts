import { Controller, Get } from '@nestjs/common';
import { PrimaryService } from './primary.service';

@Controller()
export class PrimaryController {
  constructor(private readonly primaryService: PrimaryService) {}

  @Get()
  getHello(): string {
    return this.primaryService.getHello();
  }
}
