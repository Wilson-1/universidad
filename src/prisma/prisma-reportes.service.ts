import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client-reportes';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaReportesService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaReportesService.name);
  private pool: Pool;

  constructor() {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL_REPORTES,
      max: 5,
    });

    const adapter = new PrismaPg(pool);
    super({ adapter } as any);
    this.pool = pool;
    this.logger.log('🔧 PrismaReportesService inicializado');
  }

  async onModuleInit() {
    try {
      this.logger.log('Conectando a la base de datos de reportes...');
      await this.$connect();
      this.logger.log('✅ Prisma Reportes conectado exitosamente');
    } catch (error) {
      this.logger.error('❌ Error conectando a Reportes:', error.message);
      throw error;
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      await this.pool.end();
      this.logger.log('✅ Prisma Reportes desconectado correctamente');
    } catch (error) {
      this.logger.error('❌ Error desconectando Reportes:', error.message);
    }
  }
}
