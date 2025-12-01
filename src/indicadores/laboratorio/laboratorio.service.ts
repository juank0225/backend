import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { IndicadoresLaboratorio } from '../../entities/indicadores-laboratorio.entity';

@Injectable()
export class LaboratorioService {
  constructor(
    @InjectRepository(IndicadoresLaboratorio)
    private readonly indicadoresRepo: Repository<IndicadoresLaboratorio>,
  ) {}

  async obtenerIndicadores(periodo: string) {
    const where = this.obtenerFiltroFecha(periodo);
    
    const queryOptions: any = {
      order: { fecha: 'ASC' },
    };
    
    if (where && Object.keys(where).length > 0) {
      queryOptions.where = where;
    }
    
    return this.indicadoresRepo.find(queryOptions);
  }

  async obtenerEstadisticas(periodo: string) {
    const where = this.obtenerFiltroFecha(periodo);
    
    const queryOptions: any = {};
    if (where && Object.keys(where).length > 0) {
      queryOptions.where = where;
    }
    
    const datos = await this.indicadoresRepo.find(queryOptions);
    
    return {
      promedioSatisfaccion: datos.length > 0 
        ? datos.reduce((sum, item) => sum + parseFloat(item.satisfaccionCliente.toString()), 0) / datos.length
        : 0,
      totalPlazosCumplidos: datos.reduce((sum, item) => sum + item.plazosCumplidos, 0),
      totalCapacitacion: datos.reduce((sum, item) => sum + item.capacitacionPersonal, 0),
      totalAprendices: datos.reduce((sum, item) => sum + item.atencionAprendices, 0),
      totalProyectosMejora: datos.reduce((sum, item) => sum + item.proyectosMejora, 0),
      cantidadRegistros: datos.length,
    };
  }

  private obtenerFiltroFecha(periodo: string) {
    const hoy = new Date('2025-11-01');
    
    switch (periodo) {
      case 'semana':
        const inicioSemana = new Date(hoy);
        inicioSemana.setDate(hoy.getDate() - hoy.getDay() + 1);
        const finSemana = new Date(hoy);
        finSemana.setDate(hoy.getDate() - hoy.getDay() + 7);
        
        return {
          fecha: Between(
            inicioSemana.toISOString().split('T')[0],
            finSemana.toISOString().split('T')[0]
          ),
        };

      case 'mes':
        const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
        const finMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);
        
        return {
          fecha: Between(
            inicioMes.toISOString().split('T')[0],
            finMes.toISOString().split('T')[0]
          ),
        };

      case 'año':
        const inicioAno = new Date(hoy.getFullYear(), 0, 1);
        const finAno = new Date(hoy.getFullYear(), 11, 31);
        
        return {
          fecha: Between(
            inicioAno.toISOString().split('T')[0],
            finAno.toISOString().split('T')[0]
          ),
        };

      default:
        return null;
    }
  }
}