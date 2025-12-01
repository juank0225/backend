import { Controller, Get, Query } from '@nestjs/common';
import { TecnoAcademiaService } from './tecnoacademia.service';

@Controller('indicadores/tecnoacademia')
export class TecnoAcademiaController {
  constructor(private readonly tecnoAcademiaService: TecnoAcademiaService) {}

  @Get()
  obtenerIndicadores(@Query('periodo') periodo: string = 'semana') {
    return this.tecnoAcademiaService.obtenerIndicadores(periodo);
  }

  @Get('estadisticas')
  obtenerEstadisticas(@Query('periodo') periodo: string = 'semana') {
    return this.tecnoAcademiaService.obtenerEstadisticas(periodo);
  }
}