import { IsEmail, IsInt, IsString, IsBoolean, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEstudianteDto {
  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsEmail()
  correo: string;

  @Type(() => Number)
  @IsInt()
  carreraId: number;

  @Type(() => Number)
  @IsInt()
  cicloId: number;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  activo?: boolean;
}

