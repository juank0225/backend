import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvestigacionService } from './investigacion.service';
import { InvestigacionController } from './investigacion.controller';
import { IndicadoresInvestigacion } from '../../entities/indicadores-investigacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IndicadoresInvestigacion])],
  providers: [InvestigacionService],
  controllers: [InvestigacionController],
})
export class InvestigacionModule {}