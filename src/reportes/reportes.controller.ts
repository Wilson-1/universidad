import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ReportesService } from './reportes.service';

@Controller('reportes')
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  @Post('academico')
  crearReporteAcademico(@Body() data: any) {
    return this.reportesService.crearReporteAcademico(data);
  }

  @Get('academico')
  obtenerReportesAcademicos() {
    return this.reportesService.obtenerReportesAcademicos();
  }

  @Post('docente')
  crearReporteDocente(@Body() data: any) {
    return this.reportesService.crearReporteDocente(data);
  }

  @Get('docente')
  obtenerReportesDocentes() {
    return this.reportesService.obtenerReportesDocentes();
  }

  @Post('carrera')
  crearReporteCarrera(@Body() data: any) {
    return this.reportesService.crearReporteCarrera(data);
  }

  @Get('carrera')
  obtenerReportesCarrera() {
    return this.reportesService.obtenerReportesCarrera();
  }

  @Get('estadisticas')
  obtenerEstadisticas(@Query('tipo') tipo?: string) {
    return this.reportesService.obtenerEstadisticas(tipo);
  }
}
