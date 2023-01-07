import { WINSTON_MODULE_PROVIDER, WinstonLogger } from 'nest-winston';
import { Logger } from 'winston';
import { LogLevels } from '@enums/logger';
import { Inject, LoggerService } from '@nestjs/common';

export const ILogger = Symbol('ILogger');

export interface ILogger extends LoggerService {
  sentryLog(message: any, context?: string): Logger;
}

export class CustomLoggerService extends WinstonLogger implements ILogger {
  private _context?: any;

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly _logger: Logger,
  ) {
    super(_logger);
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
