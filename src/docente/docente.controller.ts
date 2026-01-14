import { Controller, Get, Query } from '@nestjs/common';
import { DocenteService } from './docente.service';

@Controller('docente')
export class DocenteController {
	constructor(private readonly service: DocenteService) {}

	@Get('multiple-subjects')
	findWithMultipleSubjects() {
		return this.service.findWithMultipleSubjects();
	}

	@Get('search')
	findFiltered(@Query('tiempoCompleto') tiempoCompleto?: string) {
		const opts: any = {};
		if (typeof tiempoCompleto !== 'undefined') opts.tiempoCompleto = tiempoCompleto === 'true';
		return this.service.findFiltered(opts);
	}
}

