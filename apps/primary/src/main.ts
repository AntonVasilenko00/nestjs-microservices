import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { PrimaryModule } from './primary.module';

async function bootstrap() {
  const app = await NestFactory.create(PrimaryModule);

  const configService = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.get('RABBITMQ_URI')],
      queue: configService.get('RABBITMQ_AUTH_QUEUE'),
    },
  });

  await app.listen(configService.get('PORT'));
}
bootstrap();
