import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { LOGGER } from '@constants/provider';
import { Global, Module } from '@nestjs/common';
import { CustomLoggerService } from './logger.service';
import { configLoggerModule } from './utils/setup-logger-module';

@Global()
@Module({
  imports: [configLoggerModule()],
  providers: [
    {
      provide: LOGGER,
      inject: [WINSTON_MODULE_PROVIDER],
      useFactory: (logger: Logger) => {
        return new CustomLoggerService(logger);
      },
    },
  ],
  exports: [LOGGER],
})
export class LoggerModule {}
