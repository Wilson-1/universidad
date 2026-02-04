import { Injectable, OnModuleInit, OnModuleDestroy, INestApplication, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  private pool: Pool;

  constructor() {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL_UNIVERSIDAD,
      max: 5,
    });

    const adapter = new PrismaPg(pool);
    super({ adapter } as any);
    this.pool = pool;
    this.logger.log('🔧 PrismaService (Universidad) inicializado');
  }

  async onModuleInit() {
    try {
      this.logger.log('Conectando a la base de datos de universidad...');
      await this.$connect();
      this.logger.log('✅ Prisma Universidad conectado exitosamente');
    } catch (error) {
      this.logger.error('❌ Error conectando a Universidad:', error.message);
      throw error;
    }
  }

  async enableShutdownHooks(app: INestApplication): Promise<void> {
    (this as any).$on('beforeExit', async () => {
      this.logger.log('Prisma beforeExit hook triggered, closing Nest app...');
      await app.close();
    });
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      await this.pool.end();
      this.logger.log('✅ Prisma Universidad desconectado correctamente');
    } catch (error) {
      this.logger.error('❌ Error desconectando Universidad:', error.message);
    }
  }
}
