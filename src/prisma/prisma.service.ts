import { Injectable, OnModuleInit, OnModuleDestroy, INestApplication, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    const logger = new Logger(PrismaService.name);

    let adapterFound = false;
    const options: any = {};

    try {
      const adapterPkg = require('@prisma/adapter-pg');
      const AdapterClass =
        adapterPkg?.PrismaPg || adapterPkg?.default || adapterPkg?.PrismaAdapter || adapterPkg?.PrismaPgAdapter || adapterPkg?.PrismaPgAdapterFactory;

      if (AdapterClass) {
        const adapterInstance = new AdapterClass({ connectionString: process.env.DATABASE_URL });
        options.adapter = adapterInstance;
        adapterFound = true;
        logger.log('Using @prisma/adapter-pg for PrismaClient');
      } else {
        logger.warn('@prisma/adapter-pg installed but no adapter constructor found');
      }
    } catch (err) {
      logger.warn('@prisma/adapter-pg not found; set PRISMA_ACCELERATE_URL or install the adapter');
    }

    if (!adapterFound) {

      options.accelerateUrl = process.env.PRISMA_ACCELERATE_URL || process.env.DATABASE_URL || '';
    }

    super(options as any);

    (this as any)._hasAdapter = adapterFound;
  }

  async onModuleInit() {
    if ((this as any)._hasAdapter) {
      this.logger.log('Connecting to the database...');
      await this.$connect();
      this.logger.log('Connected to the database');
    } else {
      this.logger.warn('No Prisma adapter available; skipping automatic $connect(). Install @prisma/adapter-pg to enable DB connectivity.');
    }
  }

  async enableShutdownHooks(app: INestApplication): Promise<void> {
    (this as any).$on('beforeExit', async () => {
      this.logger.log('Prisma beforeExit hook triggered, closing Nest app...');
      await app.close();
    });
  }

  async onModuleDestroy() {
    this.logger.log('Disconnecting from the database...');
    await this.$disconnect();
    this.logger.log('Disconnected from the database');
  }
}
