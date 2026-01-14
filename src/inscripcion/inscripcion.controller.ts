import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { InscripcionService } from './inscripcion.service';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';

@Controller('inscripcion')
export class InscripcionController {
	constructor(private readonly service: InscripcionService) {}

	@Get('student/:estudianteId/ciclo/:cicloAcademico')
	findByStudentAndCiclo(@Param('estudianteId') estudianteId: string, @Param('cicloAcademico') cicloAcademico: string) {
		return this.service.findByStudentAndCiclo(Number(estudianteId), cicloAcademico);
	}

	@Get('report')
	estudiantesMateriasReport() {
		return this.service.estudiantesMateriasReport();
	}

	@Post('enroll')
	enroll(@Body() dto: CreateInscripcionDto) {
		return this.service.enrollTransaction(dto.estudianteId, dto.materiaId, dto.cicloAcademico);
	}
}

