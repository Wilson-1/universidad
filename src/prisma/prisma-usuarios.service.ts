import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client-usuarios';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaUsuariosService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaUsuariosService.name);
  private pool: Pool;

  constructor() {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL_USUARIOS,
      max: 5,
    });

    const adapter = new PrismaPg(pool);
    super({ adapter } as any);
    this.pool = pool;
    this.logger.log('🔧 PrismaUsuariosService inicializado');
  }

  async onModuleInit() {
    try {
      this.logger.log('Conectando a la base de datos de usuarios...');
      await this.$connect();
      this.logger.log('✅ Prisma Usuarios conectado exitosamente');
    } catch (error) {
      this.logger.error('❌ Error conectando a Usuarios:', error.message);
      throw error;
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      await this.pool.end();
      this.logger.log('✅ Prisma Usuarios desconectado correctamente');
    } catch (error) {
      this.logger.error('❌ Error desconectando Usuarios:', error.message);
    }
  }
}
