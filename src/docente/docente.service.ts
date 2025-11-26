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
}