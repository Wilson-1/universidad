import { Injectable, OnModuleInit, OnModuleDestroy, INestApplication, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    // You can pass options to PrismaClient here if needed (e.g. log level)
    super();
  }

  async onModuleInit() {
    this.logger.log('Connecting to the database...');
    await this.$connect();
    this.logger.log('Connected to the database');
  }

  /**
   * Attach a shutdown hook so that Prisma can close the connection
   * when Nest's application is shutting down. Call this from `main.ts`:
   *
   * const app = await NestFactory.create(AppModule);
   * const prismaService = app.get(PrismaService);
   * await prismaService.enableShutdownHooks(app);
   */
  async enableShutdownHooks(app: INestApplication): Promise<void> {
    // Prisma Client types for $on can be strict; cast to any to avoid TS issues
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
