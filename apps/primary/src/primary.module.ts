import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { PrimaryController } from './primary.controller';
import { PrimaryService } from './primary.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({ PORT: Joi.number().required() }),
    }),
  ],
  controllers: [PrimaryController],
  providers: [PrimaryService],
})
export class PrimaryModule {}
