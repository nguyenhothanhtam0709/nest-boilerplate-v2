import { ApiModule } from '@modules/api/api.module';
import { GlobalModule } from '@modules/global/global.module';
import { SharedModule } from '@modules/shared/shared.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService, IAppService } from './app.service';

@Module({
  imports: [GlobalModule, SharedModule, ApiModule],
  controllers: [AppController],
  providers: [
    {
      provide: IAppService,
      useClass: AppService,
    },
  ],
})
export class AppModule {}
