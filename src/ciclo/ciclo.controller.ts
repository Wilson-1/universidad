import { Controller, Get, Post, Param, Body, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { CicloService } from './ciclo.service';
import { CreateCicloDto } from './dto/create-ciclo.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('ciclo')
export class CicloController {
	constructor(private readonly service: CicloService) {}

	@Get()
	findAll(@Query('page') page = '1', @Query('limit') limit = '10') {
		return this.service.findAll(Number(page), Number(limit));
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.service.findOne(id);
	}

	@Post()
	@UseGuards(JwtAuthGuard)
	create(@Body() dto: CreateCicloDto) {
		return this.service.create(dto);
	}
}

