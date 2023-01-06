import { Controller, Get } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService as HealthCheckUtils,
  MemoryHealthIndicator,
} from '@nestjs/terminus';

@Controller('health-check')
export class HealthCheckController {
  constructor(
    private readonly healthCheck: HealthCheckUtils,
    private readonly diskCheck: DiskHealthIndicator,
    private readonly memoryCheck: MemoryHealthIndicator,
  ) {}

  @Get('disk')
  @HealthCheck()
  checkDisk() {
    return this.healthCheck.check([
      () =>
        this.diskCheck.checkStorage('/', { path: '/', thresholdPercent: 0.1 }),
    ]);
  }

  @Get('memory')
  @HealthCheck()
  checkMemory() {
    return this.healthCheck.check([
      () => this.memoryCheck.checkHeap('memory_heap', 150 * 1024 * 1024), // heap size exceed 150 mb
      () => this.memoryCheck.checkRSS('memory_rss', 150 * 1024 * 1024), // rss size exceed 150 mb
    ]);
  }
}
