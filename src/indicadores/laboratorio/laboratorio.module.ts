import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LaboratorioService } from './laboratorio.service';
import { LaboratorioController } from './laboratorio.controller';
import { IndicadoresLaboratorio } from '../../entities/indicadores-laboratorio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IndicadoresLaboratorio])],
  providers: [LaboratorioService],
  controllers: [LaboratorioController],
})
export class LaboratorioModule {}