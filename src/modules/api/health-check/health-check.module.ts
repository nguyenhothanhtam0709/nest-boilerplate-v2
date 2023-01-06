import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthCheckController } from './health-check.controller';
import {
  CustomHealthCheckService,
  IHealthCheckService,
} from './health-check.service';

@Module({
  imports: [TerminusModule],
  controllers: [HealthCheckController],
  providers: [
    {
      provide: IHealthCheckService,
      useClass: CustomHealthCheckService,
    },
  ],
})
export class HealthCheckModule {}
