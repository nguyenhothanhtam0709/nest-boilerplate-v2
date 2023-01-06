import { WinstonLogger } from 'nest-winston';
import { Logger } from 'winston';
import { LogLevels } from '@enums/logger';
import { LoggerService } from '@nestjs/common';

export interface ILogger extends LoggerService {
  sentryLog(message: any, context?: string): Logger;
}

export class CustomLoggerService extends WinstonLogger {
  private readonly _logger: Logger;
  private _context?: any;

  constructor(logger: Logger) {
    super(logger);
    this._logger = logger;
  }

  setContext(context: string): void {
    super.setContext(context);
    this._context = context;
  }

  sentryLog(message: any, context?: string): Logger {
    context = context || this._context;

    if ('object' === typeof message) {
      const { message: msg, ...meta } = message;

      return this._logger.log(LogLevels.SENTRY, msg as string, {
        context,
        ...meta,
      });
    }

    return this._logger.log(LogLevels.SENTRY, message, { context });
  }
}
