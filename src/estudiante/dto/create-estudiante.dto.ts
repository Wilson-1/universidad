import { IsEmail, IsInt, IsString } from 'class-validator';

export class CreateEstudianteDto {
  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsEmail()
  correo: string;

  @IsInt()
  carreraId: number;

  @IsInt()
  cicloId: number;
}

