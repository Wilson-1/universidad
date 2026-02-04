import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaReportesService } from './prisma-reportes.service';
import { PrismaUsuariosService } from './prisma-usuarios.service';

@Global()
@Module({
  providers: [PrismaService, PrismaReportesService, PrismaUsuariosService],
  exports: [PrismaService, PrismaReportesService, PrismaUsuariosService],
})
export class PrismaModule {}

