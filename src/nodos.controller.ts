import { Controller, Get } from '@nestjs/common';
import { NodosService } from './nodos.service';

@Controller('nodos')
export class NodosController {
  constructor(private readonly nodosService: NodosService) {}

  @Get()
  async findAll() {
    return this.nodosService.findAll();
  }
}