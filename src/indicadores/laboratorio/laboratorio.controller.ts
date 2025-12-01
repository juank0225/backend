import { Controller, Get, Query } from '@nestjs/common';
import { LaboratorioService } from './laboratorio.service';

@Controller('indicadores/laboratorio')
export class LaboratorioController {
  constructor(private readonly laboratorioService: LaboratorioService) {}

  @Get()
  obtenerIndicadores(@Query('periodo') periodo: string = 'semana') {
    return this.laboratorioService.obtenerIndicadores(periodo);
  }

  @Get('estadisticas')
  obtenerEstadisticas(@Query('periodo') periodo: string = 'semana') {
    return this.laboratorioService.obtenerEstadisticas(periodo);
  }
}