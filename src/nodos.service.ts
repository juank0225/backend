import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nodo } from './entities/nodo.entity';

@Injectable()
export class NodosService {
  constructor(
    @InjectRepository(Nodo)
    private readonly nodoRepository: Repository<Nodo>,
  ) {}

  async findAll() {
    return this.nodoRepository.find({
      order: { nombreNodo: 'ASC' },
    });
  }
}