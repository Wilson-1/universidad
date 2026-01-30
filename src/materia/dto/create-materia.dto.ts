import { IsInt, IsString, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMateriaDto {
  @IsString()
  nombre: string;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  creditos: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  carreraId: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  docenteId: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  cupo?: number;
}
