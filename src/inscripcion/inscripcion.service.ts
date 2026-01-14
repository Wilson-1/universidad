import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto';
import { ForbiddenException } from '@nestjs/common';

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

  // Parte 1: Mostrar las matrículas de un estudiante en un período académico determinado
  async findByStudentAndCiclo(estudianteId: number, cicloAcademico: string) {
    return this.prisma.inscripcion.findMany({ where: { estudianteId, cicloAcademico }, include: { materia: true } });
  }

  // Parte 3: Consulta nativa - reporte de estudiante, carrera y número total de materias matriculadas
  async estudiantesMateriasReport() {
    const result = await this.prisma.$queryRaw`
      SELECT e.nombre || ' ' || e.apellido AS nombre, c.nombre AS carrera, COUNT(i.id) AS total_materias
      FROM "Estudiante" e
      JOIN "Carrera" c ON e."carreraId" = c.id
      LEFT JOIN "Inscripcion" i ON i."estudianteId" = e.id
      GROUP BY e.id, c.nombre
      ORDER BY total_materias DESC
    `;
    return result;
  }

  // Parte 4: Operación transaccional para matriculación
  async enrollTransaction(estudianteId: number, materiaId: number, cicloAcademico: string) {
    return this.prisma.$transaction(async (tx) => {
      const estudiante = await tx.estudiante.findUnique({ where: { id: estudianteId } });
      if (!estudiante || estudiante.activo === false) throw new ForbiddenException('Estudiante no activo o no encontrado');

      const materia = await tx.materia.findUnique({ where: { id: materiaId } });
      if (!materia) throw new NotFoundException('Materia no encontrada');
      if ((materia.cupo ?? 0) <= 0) throw new ForbiddenException('No hay cupos disponibles');

      const inscripcion = await tx.inscripcion.create({ data: { estudianteId, materiaId, cicloAcademico } });

      await tx.materia.update({ where: { id: materiaId }, data: { cupo: (materia.cupo ?? 0) - 1 } });

      return inscripcion;
    });
  }
}