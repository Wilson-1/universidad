import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';

@Injectable()
export class EstudianteService {
  constructor(private prisma: PrismaService) {}

  async findAll(page = 1, limit = 10) {
    return this.prisma.estudiante.findMany({ skip: (page - 1) * limit, take: limit });
  }

  async findOne(id: number) {
    const estudiante = await this.prisma.estudiante.findUnique({ where: { id } });
    if (!estudiante) throw new NotFoundException(`Estudiante con id ${id} no encontrado`);
    return estudiante;
  }

  async create(data: CreateEstudianteDto) {
    return this.prisma.estudiante.create({ data });
  }
}
