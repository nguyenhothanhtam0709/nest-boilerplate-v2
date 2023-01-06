import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { EnvKeyName } from '@enums/env';
import { LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  const logger = app.get<LoggerService>(WINSTON_MODULE_NEST_PROVIDER);
  const configService = app.get(ConfigService);

  const port = configService.get<number>(EnvKeyName.API_PORT);
  await app.listen(port);
  logger.log(`Server running on port ${port}`);
  app.flushLogs();
}
bootstrap();
