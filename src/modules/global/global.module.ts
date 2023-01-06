import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RewriteFrames } from '@sentry/integrations';
import * as Sentry from '@sentry/node';
import { LoggerModule } from './logger/logger.module';
import { SetupConfigModule } from './utils/setup-config-module';

@Module({
  imports: [SetupConfigModule(), LoggerModule],
})
export class GlobalModule implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    /**
     * init Sentry
     */
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      tracesSampleRate: 1.0,
      integrations: [
        new RewriteFrames({
          root: global.__dirname,
        }),
      ],
    });
  }
}
