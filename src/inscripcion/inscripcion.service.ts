import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';

@Injectable()
export class InscripcionService {
  constructor(private prisma: PrismaService) {}

  async findAll(page = 1, limit = 10) {
    return this.prisma.inscripcion.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: { estudiante: true, materia: true },
    });
  }

  async findOne(id: number) {
    const inscripcion = await this.prisma.inscripcion.findUnique({
      where: { id },
      include: { estudiante: true, materia: true },
    });
    if (!inscripcion) throw new NotFoundException(`Inscripción con id ${id} no encontrada`);
    return inscripcion;
  }

  async create(data: CreateInscripcionDto) {
    return this.prisma.inscripcion.create({ data });
  }
}