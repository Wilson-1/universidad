import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCicloDto {
  @Type(() => Number)
  @IsInt()
  numero: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  carreraId: number;
}
