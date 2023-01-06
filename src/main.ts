import { EnvKeyName } from '@enums/env';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get<number>(EnvKeyName.API_PORT);
  await app.listen(port);
}
bootstrap();
