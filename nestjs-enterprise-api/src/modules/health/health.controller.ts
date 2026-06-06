import { Controller, Get, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { PrismaHealthIndicator } from './prisma-health.indicator';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly database: PrismaHealthIndicator,
  ) {}

  @Get()
  @Version('1')
  @HealthCheck()
  check() {
    return this.health.check([() => this.database.isHealthy('database')]);
  }
}
