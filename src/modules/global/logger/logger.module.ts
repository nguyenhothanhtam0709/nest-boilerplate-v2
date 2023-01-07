import { Global, Module } from '@nestjs/common';
import { CustomLoggerService, ILogger } from './logger.service';
import { configLoggerModule } from './utils/setup-logger-module';

@Global()
@Module({
  imports: [configLoggerModule()],
  providers: [
    {
      provide: ILogger,
      useClass: CustomLoggerService,
    },
  ],
  exports: [ILogger],
})
export class LoggerModule {}
