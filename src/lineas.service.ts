import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Linea } from './entities/linea.entity';

@Injectable()
export class LineasService {
  constructor(
    @InjectRepository(Linea)
    private readonly lineaRepository: Repository<Linea>,
  ) {}

  async findByNodo(idNodo: number) {
    return this.lineaRepository.find({
      where: {
        nodo: { idNodo },
      },
      order: { nombreLinea: 'ASC' },
    });
  }
}