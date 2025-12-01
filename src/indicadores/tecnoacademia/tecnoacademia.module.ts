import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TecnoAcademiaService } from './tecnoacademia.service';
import { TecnoAcademiaController } from './tecnoacademia.controller';
import { IndicadoresTecnoAcademia } from '../../entities/indicadores-tecnoacademia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IndicadoresTecnoAcademia])],
  providers: [TecnoAcademiaService],
  controllers: [TecnoAcademiaController],
})
export class TecnoAcademiaModule {}