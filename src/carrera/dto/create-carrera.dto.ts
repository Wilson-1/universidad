import { IsInt, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCarreraDto {
  @IsString()
  nombre: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  duracion: number;
}
