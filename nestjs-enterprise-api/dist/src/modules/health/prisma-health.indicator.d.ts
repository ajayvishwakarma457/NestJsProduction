import { HealthIndicatorService, HealthIndicatorResult } from '@nestjs/terminus';
import { PrismaService } from '../../infrastructure/database/prisma.service';
export declare class PrismaHealthIndicator {
    private readonly prisma;
    private readonly healthIndicatorService;
    constructor(prisma: PrismaService, healthIndicatorService: HealthIndicatorService);
    isHealthy(key: string): Promise<HealthIndicatorResult>;
}
