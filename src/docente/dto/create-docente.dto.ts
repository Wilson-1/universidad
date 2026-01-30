import { IsInt, IsString, IsBoolean, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDocenteDto {
  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsString()
  especialidad: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  carreraId: number;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  activo?: boolean;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  tiempoCompleto?: boolean;
}
