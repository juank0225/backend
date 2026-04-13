import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { TecnoParqueService } from './tecnoparque.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateIndicadorTecnoparqueDto } from './dto/create-indicador-tecnoparque.dto';

@Controller('indicadores/tecnoparque')
@UseGuards(JwtAuthGuard)
export class TecnoParqueController {
  constructor(private readonly tecnoParqueService: TecnoParqueService) { }

  @Get()
  obtenerIndicadores(@Query('periodo') periodo: string = 'semana') {
    return this.tecnoParqueService.obtenerIndicadores(periodo);
  }

  @Get('estadisticas')
  obtenerEstadisticas(@Query('periodo') periodo: string = 'semana') {
    return this.tecnoParqueService.obtenerEstadisticas(periodo);
  }

  @Post()
  crearIndicador(@Body() dto: CreateIndicadorTecnoparqueDto) {
    return this.tecnoParqueService.crearIndicador(dto);
  }
}