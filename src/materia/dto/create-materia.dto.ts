import { IsInt, IsString } from 'class-validator';

export class CreateMateriaDto {
  @IsString()
  nombre: string;

  @IsInt()
  creditos: number;

  @IsInt()
  carreraId: number;

  @IsInt()
  docenteId: number;

  cupo?: number;
}
