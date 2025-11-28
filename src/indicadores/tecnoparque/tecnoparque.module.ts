import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TecnoParqueService } from './tecnoparque.service';
import { TecnoParqueController } from './tecnoparque.controller';
import { IndicadoresTecnoParque } from '../../entities/indicadores-tecnoparque.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IndicadoresTecnoParque])],
  providers: [TecnoParqueService],
  controllers: [TecnoParqueController],
})
export class TecnoParqueModule {}