import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { IndicadoresTecnoParque } from '../../entities/indicadores-tecnoparque.entity';

@Injectable()
export class TecnoParqueService {
  constructor(
    @InjectRepository(IndicadoresTecnoParque)
    private readonly indicadoresRepo: Repository<IndicadoresTecnoParque>,
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
      totalArticulaciones: datos.reduce((sum, item) => sum + item.articulaciones, 0),
      totalVisitas: datos.reduce((sum, item) => sum + item.visitas, 0),
      totalGiras: datos.reduce((sum, item) => sum + item.giras, 0),
      totalAsesorias: datos.reduce((sum, item) => sum + item.asesorias, 0),
      cantidadRegistros: datos.length,
    };
  }

  private obtenerFiltroFecha(periodo: string) {
    const hoy = new Date();
    
    switch (periodo) {
      case 'semana':
        const inicioSemana = new Date(hoy);
        inicioSemana.setDate(hoy.getDate() - hoy.getDay() + 1); // Lunes
        const finSemana = new Date(hoy);
        finSemana.setDate(hoy.getDate() - hoy.getDay() + 7); // Domingo
        
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
        return null; // Cambiar a null en lugar de objeto vacío
    }
  }
}