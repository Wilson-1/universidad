import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDocenteDto } from './dto/create-docente.dto';

@Injectable()
export class DocenteService {
  constructor(private prisma: PrismaService) {}

  async findAll(page = 1, limit = 10) {
    return this.prisma.docente.findMany({ skip: (page - 1) * limit, take: limit });
  }

  async findOne(id: number) {
    const docente = await this.prisma.docente.findUnique({ where: { id } });
    if (!docente) throw new NotFoundException(`Docente con id ${id} no encontrado`);
    return docente;
  }

  async create(data: CreateDocenteDto) {
    return this.prisma.docente.create({ data });
  }

  // Parte 1: Listar los docentes que imparten más de una asignatura
  async findWithMultipleSubjects() {
    const docentes = await this.prisma.docente.findMany({ include: { materias: true } });
    return docentes.filter((d) => (d.materias || []).length > 1);
  }

  // Parte 2: Filtrar docentes con operadores lógicos
  async findFiltered(options: { tiempoCompleto?: boolean }) {
    const where: any = {};
    if (typeof options.tiempoCompleto === 'boolean') where.tiempoCompleto = options.tiempoCompleto;

    // tiempoCompleto AND (dictan asignaturas OR no están inactivos)
    return this.prisma.docente.findMany({ where, include: { materias: true } }).then((list) =>
      list.filter((d) => d.tiempoCompleto === true && ((d.materias && d.materias.length > 0) || d.activo === true)),
    );
  }
}