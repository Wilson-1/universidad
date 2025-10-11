import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarreraModule } from './carrera/carrera.module';
import { InscripcionModule } from './inscripcion/inscripcion.module';
import { MateriaModule } from './materia/materia.module';
import { DocenteModule } from './docente/docente.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { CicloModule } from './ciclo/ciclo.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, CarreraModule, MateriaModule, DocenteModule, EstudianteModule, CicloModule, InscripcionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
