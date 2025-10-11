import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateInscripcionDto {
  @IsString()
  cicloAcademico: string;

  @IsOptional()
  @IsNumber()
  notaFinal?: number;

  @IsInt()
  estudianteId: number;

  @IsInt()
  materiaId: number;
}
