import { IsInt, IsString } from 'class-validator';

export class CreateDocenteDto {
  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsString()
  especialidad: string;

  @IsInt()
  carreraId: number;
}
