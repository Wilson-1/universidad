import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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
    try {
      return await this.prisma.estudiante.create({ data });
    } catch (e: any) {
      // Foreign key constraint violation => likely carreraId or cicloId missing
      if (e?.code === 'P2003') {
        throw new BadRequestException('Foreign key constraint violated: check carreraId and cicloId exist');
      }
      throw e;
    }
  }

  // Parte 1: Listar todos los estudiantes activos junto con su carrera
  async findActiveWithCareer() {
    return this.prisma.estudiante.findMany({ where: { activo: true }, include: { carrera: true } });
  }

  // Parte 2: Consulta con operadores lógicos
  async findFiltered(options: { activo?: boolean; carreraId?: number; cicloAcademico?: string }) {
    const where: any = {};
    if (typeof options.activo === 'boolean') where.activo = options.activo;
    if (options.carreraId) where.carreraId = options.carreraId;
    if (options.cicloAcademico) {
      where.inscripciones = { some: { cicloAcademico: options.cicloAcademico } };
    }
    return this.prisma.estudiante.findMany({ where, include: { carrera: true, inscripciones: true } });
  }
}