import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCarreraDto } from './dto/create-carrera.dto';

@Injectable()
export class CarreraService {
  constructor(private prisma: PrismaService) {}

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return this.prisma.carrera.findMany({
      skip,
      take: limit,
      include: { ciclos: true, estudiantes: true, docentes: true, materias: true },
    });
  }

  async findOne(id: number) {
    const carrera = await this.prisma.carrera.findUnique({
      where: { id },
      include: { ciclos: true, estudiantes: true, docentes: true, materias: true },
    });
    if (!carrera) throw new NotFoundException(`Carrera con id ${id} no encontrada`);
    return carrera;
  }

  async findByNombre(nombre: string) {
    const carrera = await this.prisma.carrera.findFirst({
      where: { nombre },
      include: { ciclos: true, estudiantes: true, docentes: true, materias: true },
    });
    if (!carrera) throw new NotFoundException(`Carrera con nombre "${nombre}" no encontrada`);
    return carrera;
  }

  async create(data: CreateCarreraDto) {
    return this.prisma.carrera.create({ data });
  }
}
