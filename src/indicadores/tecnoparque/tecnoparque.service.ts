import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { IndicadoresTecnoParque } from '../../entities/indicadores-tecnoparque.entity';
import { CreateIndicadorTecnoparqueDto } from './dto/create-indicador-tecnoparque.dto';

@Injectable()
export class TecnoParqueService {
  constructor(
    @InjectRepository(IndicadoresTecnoParque)
    private readonly indicadoresRepo: Repository<IndicadoresTecnoParque>,
  ) { }

  async crearIndicador(dto: CreateIndicadorTecnoparqueDto) {
    const nuevoIndicador = this.indicadoresRepo.create({
      fecha: dto.fecha,
      proyectos: dto.proyectos,
      articulaciones: dto.articulaciones,
      visitas: dto.visitas,
      giras: dto.giras,
      asesorias: dto.asesorias,
      tipoRegistro: dto.tipoRegistro,
      observaciones: dto.observaciones?.trim() || undefined,
    });

    return await this.indicadoresRepo.save(nuevoIndicador);
  }

  async obtenerIndicadores(periodo: string) {
    const where = this.obtenerFiltroFecha(periodo);

    const queryOptions: any = {
      order: { fecha: 'ASC' },
    };

    if (where) {
      queryOptions.where = where;
    }

    return this.indicadoresRepo.find(queryOptions);
  }

  async obtenerEstadisticas(periodo: string) {
    const where = this.obtenerFiltroFecha(periodo);

    const queryOptions: any = {};
    if (where) {
      queryOptions.where = where;
    }

    const datos = await this.indicadoresRepo.find(queryOptions);

    return {
      totalProyectos: datos.reduce((sum, item) => sum + Number(item.proyectos || 0), 0),
      totalArticulaciones: datos.reduce((sum, item) => sum + Number(item.articulaciones || 0), 0),
      totalVisitas: datos.reduce((sum, item) => sum + Number(item.visitas || 0), 0),
      totalGiras: datos.reduce((sum, item) => sum + Number(item.giras || 0), 0),
      totalAsesorias: datos.reduce((sum, item) => sum + Number(item.asesorias || 0), 0),
      cantidadRegistros: datos.length,
    };
  }

  private formatearFechaLocal(fecha: Date): string {
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private obtenerFiltroFecha(periodo: string) {
    const hoy = new Date();

    switch (periodo) {
      case 'semana': {
        const diaSemana = hoy.getDay();
        const diffLunes = diaSemana === 0 ? 6 : diaSemana - 1;

        const inicioSemana = new Date(hoy);
        inicioSemana.setHours(0, 0, 0, 0);
        inicioSemana.setDate(hoy.getDate() - diffLunes);

        const finSemana = new Date(inicioSemana);
        finSemana.setDate(inicioSemana.getDate() + 6);

        return {
          fecha: Between(
            this.formatearFechaLocal(inicioSemana),
            this.formatearFechaLocal(finSemana),
          ),
        };
      }

      case 'mes': {
        const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
        const finMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);

        return {
          fecha: Between(
            this.formatearFechaLocal(inicioMes),
            this.formatearFechaLocal(finMes),
          ),
        };
      }

      case 'año': {
        const inicioAno = new Date(hoy.getFullYear(), 0, 1);
        const finAno = new Date(hoy.getFullYear(), 11, 31);

        return {
          fecha: Between(
            this.formatearFechaLocal(inicioAno),
            this.formatearFechaLocal(finAno),
          ),
        };
      }

      default:
        return null;
    }
  }
}