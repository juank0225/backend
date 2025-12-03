import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { IndicadoresInvestigacion } from '../../entities/indicadores-investigacion.entity';

@Injectable()
export class InvestigacionService {
  constructor(
    @InjectRepository(IndicadoresInvestigacion)
    private readonly indicadoresRepo: Repository<IndicadoresInvestigacion>,
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
      totalProyectos: datos.reduce((sum, item) => sum + item.proyectos, 0),
      totalPublicaciones: datos.reduce((sum, item) => sum + item.publicaciones, 0),
      totalPrototipos: datos.reduce((sum, item) => sum + item.prototipos, 0),
      totalFinanciamiento: datos.reduce((sum, item) => sum + parseFloat(item.financiamiento.toString()), 0),
      totalPatentes: datos.reduce((sum, item) => sum + item.patentes, 0),
      cantidadRegistros: datos.length,
    };
  }

  private obtenerFiltroFecha(periodo: string) {
    const hoy = new Date(); // Usar la fecha actual real
    
    switch (periodo) {
      case 'semana':
        // Últimos 7 días desde hoy
        const inicioDia = new Date(hoy);
        inicioDia.setDate(hoy.getDate() - 6);
        
        return {
          fecha: Between(
            inicioDia.toISOString().split('T')[0],
            hoy.toISOString().split('T')[0]
          ),
        };

      case 'mes':
        // Desde el día 1 del mes actual hasta hoy
        const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
        
        return {
          fecha: Between(
            inicioMes.toISOString().split('T')[0],
            hoy.toISOString().split('T')[0]
          ),
        };

      case 'año':
        // Desde el 1 de enero del año actual hasta hoy
        const inicioAno = new Date(hoy.getFullYear(), 0, 1);
        
        return {
          fecha: Between(
            inicioAno.toISOString().split('T')[0],
            hoy.toISOString().split('T')[0]
          ),
        };

      default:
        return null;
    }
  }
}