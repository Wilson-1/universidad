import { Controller, Get, Param } from '@nestjs/common';
import { MateriaService } from './materia.service';

@Controller('materia')
export class MateriaController {
	constructor(private readonly service: MateriaService) {}

	@Get('by-carrera/:carreraId')
	findByCarrera(@Param('carreraId') carreraId: string) {
		return this.service.findByCarrera(Number(carreraId));
	}
}

