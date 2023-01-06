import { ApiModule } from '@modules/api/api.module';
import { GlobalModule } from '@modules/global/global.module';
import { SharedModule } from '@modules/shared/shared.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

@Module({
  imports: [GlobalModule, SharedModule, ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
