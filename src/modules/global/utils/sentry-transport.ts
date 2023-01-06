import TransportStream from 'winston-transport';
import { LogLevels, logLevels } from '@enums/logger';
import Sentry from '@sentry/node';

interface LogInfo {
  context?: any;
  level: LogLevels;
  message: any;
}

export class SentryTransport extends TransportStream {
  private readonly sentry: typeof Sentry;

  constructor(
    sentry: typeof Sentry,
    opts?: TransportStream.TransportStreamOptions,
  ) {
    super(opts);
    this.sentry = sentry;
  }

  log(info: LogInfo, callback: () => void): void {
    if (logLevels[info.level] <= logLevels[LogLevels.SENTRY]) {
      setImmediate(() => {
        this.emit('logged', info);
      });

      this.sentry.captureMessage(info.message);
    }

    callback();
  }
}
