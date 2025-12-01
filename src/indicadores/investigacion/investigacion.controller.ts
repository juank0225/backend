import { Controller, Get, Query } from '@nestjs/common';
import { InvestigacionService } from './investigacion.service';

@Controller('indicadores/investigacion')
export class InvestigacionController {
  constructor(private readonly investigacionService: InvestigacionService) {}

  @Get()
  obtenerIndicadores(@Query('periodo') periodo: string = 'semana') {
    return this.investigacionService.obtenerIndicadores(periodo);
  }

  @Get('estadisticas')
  obtenerEstadisticas(@Query('periodo') periodo: string = 'semana') {
    return this.investigacionService.obtenerEstadisticas(periodo);
  }
}