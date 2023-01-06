import { Module } from '@nestjs/common';
import { SetupConfigModule } from './utils/setup-config-module';

@Module({
  imports: [SetupConfigModule()],
})
export class GlobalModule {}
