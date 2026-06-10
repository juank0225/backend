import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { LineasService } from './lineas.service';

@Controller('lineas')
export class LineasController {
  constructor(private readonly lineasService: LineasService) {}

  @Get('nodo/:idNodo')
  async findByNodo(@Param('idNodo', ParseIntPipe) idNodo: number) {
    return this.lineasService.findByNodo(idNodo);
  }
}