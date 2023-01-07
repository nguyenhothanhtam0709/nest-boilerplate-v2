import { Controller, Get, Inject } from '@nestjs/common';
import { IHealthCheckService } from './health-check.service';
import { HealthCheck } from '@nestjs/terminus';

@Controller('health-check')
export class HealthCheckController {
  constructor(
    @Inject(IHealthCheckService)
    private readonly healthCheckService: IHealthCheckService,
  ) {}

  @Get('disk')
  @HealthCheck()
  checkDisk() {
    return this.healthCheckService.checkDisk();
  }

  @Get('memory')
  @HealthCheck()
  checkMemory() {
    return this.healthCheckService.checkMemory();
  }
}
