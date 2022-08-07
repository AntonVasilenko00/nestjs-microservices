import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));

  await app.listen(configService.get('PORT'));
}
bootstrap();
