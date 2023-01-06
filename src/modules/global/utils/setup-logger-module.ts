import {
  WinstonModule,
  WinstonModuleOptions,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import { format, transports } from 'winston';
import { ConfigService } from '@nestjs/config';

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

      const config: WinstonModuleOptions = {
        transports: [consoleTransport, fileTransport],
      };

      return config;
    },
  });
