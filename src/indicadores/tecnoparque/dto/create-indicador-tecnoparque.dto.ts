import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateIndicadorTecnoparqueDto {
  @IsDateString()
  fecha: string;

  @IsInt()
  @Min(0)
  proyectos: number;

  @IsInt()
  @Min(0)
  articulaciones: number;

  @IsInt()
  @Min(0)
  visitas: number;

  @IsInt()
  @Min(0)
  giras: number;

  @IsInt()
  @Min(0)
  asesorias: number;

 @IsEnum({ diario: 'diario', acumulado: 'acumulado' })
  tipoRegistro: 'diario' | 'acumulado';

  @IsOptional()
  @IsString()
  observaciones?: string;
}