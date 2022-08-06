import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { PrimaryModule } from './primary.module';

async function bootstrap() {
  const app = await NestFactory.create(PrimaryModule);

  const configService = app.get(ConfigService);

  await app.listen(configService.get('PORT'));
}
bootstrap();
