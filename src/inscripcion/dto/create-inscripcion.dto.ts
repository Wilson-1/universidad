import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateInscripcionDto {
  @IsString()
  cicloAcademico: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  notaFinal?: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  estudianteId: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  materiaId: number;
}
