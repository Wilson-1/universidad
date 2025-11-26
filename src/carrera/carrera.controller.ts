import { Controller, Get, Param, Post, Body, Query, UseGuards } from '@nestjs/common';
import { CarreraService } from './carrera.service';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('carrera')
export class CarreraController {
  constructor(private readonly carreraService: CarreraService) {}

  @Get()
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.carreraService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carreraService.findOne(Number(id));
  }

  @Get('nombre/:nombre')
  findByNombre(@Param('nombre') nombre: string) {
    return this.carreraService.findByNombre(nombre);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateCarreraDto) {
    return this.carreraService.create(dto);
  }
}