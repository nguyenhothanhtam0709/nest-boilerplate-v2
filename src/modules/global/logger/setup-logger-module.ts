import {
  WinstonModule,
  WinstonModuleOptions,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import { format, transports } from 'winston';
import { LogLevels, logLevels } from '@enums/logger';
import { ConfigService } from '@nestjs/config';
import * as Sentry from '@sentry/node';
import { SentryTransport } from '../utils/sentry-transport';

export const configLoggerModule = () =>
  WinstonModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      const consoleTransport = new transports.Console({
        format: nestWinstonModuleUtilities.format.nestLike(),
      });

      const fileTransport = new transports.File({
        level: 'error',
        dirname: 'logs',
        filename: 'combined.log',
        maxsize: 5242880, // 5mb
        format: format.combine(
          format.timestamp(),
          format.ms(),
          format.simple(),
        ),
      });

      const sentryTransport = new SentryTransport(Sentry, {
        level: LogLevels.SENTRY,
      });

      const config: WinstonModuleOptions = {
        levels: logLevels,
        transports: [consoleTransport, fileTransport, sentryTransport],
      };

      return config;
    },
  });
