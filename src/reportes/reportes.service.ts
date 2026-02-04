import { Injectable } from '@nestjs/common';
import { PrismaReportesService } from '../prisma/prisma-reportes.service';

@Injectable()
export class ReportesService {
  constructor(private prismaReportes: PrismaReportesService) {}

  async crearReporteAcademico(data: any) {
    return (this.prismaReportes as any).reporteAcademico.create({ data });
  }

  async obtenerReportesAcademicos() {
    return (this.prismaReportes as any).reporteAcademico.findMany();
  }

  async crearReporteDocente(data: any) {
    return (this.prismaReportes as any).reporteDocente.create({ data });
  }

  async obtenerReportesDocentes() {
    return (this.prismaReportes as any).reporteDocente.findMany();
  }

  async crearReporteCarrera(data: any) {
    return (this.prismaReportes as any).reporteCarrera.create({ data });
  }

  async obtenerReportesCarrera() {
    return (this.prismaReportes as any).reporteCarrera.findMany();
  }

  async obtenerEstadisticas(tipo?: string) {
    return (this.prismaReportes as any).estadistica.findMany({
      where: tipo ? { tipo } : undefined,
    });
  }
}
