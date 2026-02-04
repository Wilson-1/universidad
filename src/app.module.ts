import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarreraModule } from './carrera/carrera.module';
import { InscripcionModule } from './inscripcion/inscripcion.module';
import { MateriaModule } from './materia/materia.module';
import { DocenteModule } from './docente/docente.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { CicloModule } from './ciclo/ciclo.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ReportesModule } from './reportes/reportes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    PrismaModule,
    AuthModule,
    CarreraModule,
    MateriaModule,
    DocenteModule,
    EstudianteModule,
    CicloModule,
    InscripcionModule,
    ReportesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
