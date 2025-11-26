import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCicloDto } from './dto/create-ciclo.dto';

@Injectable()
export class CicloService {
  constructor(private prisma: PrismaService) {}

  async findAll(page = 1, limit = 10) {
    return this.prisma.ciclo.findMany({ skip: (page - 1) * limit, take: limit });
  }

  async findOne(id: number) {
    const ciclo = await this.prisma.ciclo.findUnique({ where: { id } });
    if (!ciclo) throw new NotFoundException(`Ciclo con id ${id} no encontrado`);
    return ciclo;
  }

  async create(data: CreateCicloDto) {
    return this.prisma.ciclo.create({ data });
  }
}