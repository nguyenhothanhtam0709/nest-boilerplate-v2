import { Inject } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheckResult,
  HealthCheckService,
  MemoryHealthIndicator,
} from '@nestjs/terminus';

export const IHealthCheckService = Symbol('IHealthCheckService');

export interface IHealthCheckService {
  checkDisk(): Promise<HealthCheckResult>;
  checkMemory(): Promise<HealthCheckResult>;
}

export class CustomHealthCheckService implements IHealthCheckService {
  constructor(
    @Inject(HealthCheckService)
    private readonly healthCheck: HealthCheckService,

    @Inject(DiskHealthIndicator)
    private readonly diskCheck: DiskHealthIndicator,

    @Inject(MemoryHealthIndicator)
    private readonly memoryCheck: MemoryHealthIndicator,
  ) {
    console.log('constructor');
  }

  public checkDisk(): Promise<HealthCheckResult> {
    return this.healthCheck.check([
      () =>
        this.diskCheck.checkStorage('/', { path: '/', thresholdPercent: 0.1 }),
    ]);
  }

  public checkMemory(): Promise<HealthCheckResult> {
    return this.healthCheck.check([
      () => this.memoryCheck.checkHeap('memory_heap', 150 * 1024 * 1024), // heap size exceed 150 mb
      () => this.memoryCheck.checkRSS('memory_rss', 150 * 1024 * 1024), // rss size exceed 150 mb
    ]);
  }
}
