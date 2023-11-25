import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { Env } from './env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });

  const configService: ConfigService<Env> = app.get(ConfigService);
  const port = configService.get('PORT', { infer: true });

  await app.listen(port);
}

bootstrap();