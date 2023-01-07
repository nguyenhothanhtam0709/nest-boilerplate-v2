import { EnvKeyName } from '@enums/env';
import { ILogger } from '@modules/global/logger/logger.service';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(app.get(ILogger));
  const logger = app.get<ILogger>(ILogger);
  const configService = app.get(ConfigService);

  const port = configService.get<number>(EnvKeyName.API_PORT);
  await app.listen(port);
  logger.log(`Server running on port ${port}`);
  app.flushLogs();
}
bootstrap();
