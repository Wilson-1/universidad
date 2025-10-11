import { IsInt, Min } from 'class-validator';

export class CreateCicloDto {
  @IsInt()
  numero: number;

  @IsInt()
  @Min(1)
  carreraId: number;
}
