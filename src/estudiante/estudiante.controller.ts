import { Controller, Get, Post, Body, Query, BadRequestException } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';

@Controller('estudiante')
export class EstudianteController {
	constructor(private readonly service: EstudianteService) {}

	@Get('active-with-career')
	findActiveWithCareer() {
		return this.service.findActiveWithCareer();
	}

	@Get('search')
	findFiltered(@Query('activo') activo?: string, @Query('carreraId') carreraId?: string, @Query('cicloAcademico') cicloAcademico?: string) {
		const opts: any = {};
		if (typeof activo !== 'undefined') opts.activo = activo === 'true';
		if (carreraId) opts.carreraId = Number(carreraId);
		if (cicloAcademico) opts.cicloAcademico = cicloAcademico;
		return this.service.findFiltered(opts);
	}

	@Post()
	create(@Body() dto: CreateEstudianteDto) {
		if (!dto) throw new BadRequestException('Request body is required');
		return this.service.create(dto);
	}
}

