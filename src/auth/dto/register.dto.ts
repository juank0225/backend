import {
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsEmail()
  correo: string;

  @IsOptional()
  @IsString()
  celular?: string;

  @IsString()
  @IsIn(['CC', 'CE', 'TI', 'PASAPORTE'])
  tipoDoc: string;

  @IsString()
  @IsNotEmpty()
  numDoc: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsInt()
  lineaId: number;
}