import { Module } from '@nestjs/common';
import { SetupConfigModule } from './utils/setup-config-module';
import { configLoggerModule } from './utils/setup-logger-module';

@Module({
  imports: [SetupConfigModule(), configLoggerModule()],
})
export class GlobalModule {}
