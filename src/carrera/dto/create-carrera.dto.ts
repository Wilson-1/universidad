import { IsInt, IsString, Min } from 'class-validator';

export class CreateCarreraDto {
  @IsString()
  nombre: string;

  @IsInt()
  @Min(1)
  duracion: number;
}
