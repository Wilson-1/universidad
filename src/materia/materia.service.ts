import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMateriaDto } from './dto/create-materia.dto';

@Injectable()
export class MateriaService {
  constructor(private prisma: PrismaService) {}

  async findAll(page = 1, limit = 10) {
    return this.prisma.materia.findMany({ skip: (page - 1) * limit, take: limit });
  }

  async findOne(id: number) {
    const materia = await this.prisma.materia.findUnique({ where: { id } });
    if (!materia) throw new NotFoundException(`Materia con id ${id} no encontrada`);
    return materia;
  }

  async create(data: CreateMateriaDto) {
    return this.prisma.materia.create({ data });
  }
}