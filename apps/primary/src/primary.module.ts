import { RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as Joi from 'joi';
import { PrimaryController } from './primary.controller';
import { PrimaryService } from './primary.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_AUTH_QUEUE: Joi.string().required(),
      }),
    }),
    RmqModule.register({
      name: 'AUTH',
    }),
  ],
  controllers: [PrimaryController],
  providers: [PrimaryService],
})
export class PrimaryModule {}
