import { EnvKeyName } from '@enums/env';
import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RewriteFrames } from '@sentry/integrations';
import * as Sentry from '@sentry/node';
import { setupConfigModule } from './config/setup-config-module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [setupConfigModule(), LoggerModule],
})
export class GlobalModule implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    /**
     * init Sentry
     */
    Sentry.init({
      dsn: this.configService.get<string>(EnvKeyName.SENTRY_DSN),
      tracesSampleRate: 1.0,
      integrations: [
        new RewriteFrames({
          root: global.__dirname,
        }),
      ],
    });
  }
}
