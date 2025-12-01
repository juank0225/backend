import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { IndicadoresTecnoAcademia } from '../../entities/indicadores-tecnoacademia.entity';

@Injectable()
export class TecnoAcademiaService {
  constructor(
    @InjectRepository(IndicadoresTecnoAcademia)
    private readonly indicadoresRepo: Repository<IndicadoresTecnoAcademia>,
  ) {}

  async obtenerIndicadores(periodo: string) {
    const where = this.obtenerFiltroFecha(periodo);
    
    console.log('Filtro aplicado:', where); // Debug
    
    const queryOptions: any = {
      order: { fecha: 'ASC' },
    };
    
    if (where && Object.keys(where).length > 0) {
      queryOptions.where = where;
    }
    
    const resultados = await this.indicadoresRepo.find(queryOptions);
    console.log(`Número de registros encontrados para ${periodo}: ${resultados.length}`); // Debug
    
    return resultados;
  }

  async obtenerEstadisticas(periodo: string) {
    const where = this.obtenerFiltroFecha(periodo);
    
    const queryOptions: any = {};
    if (where && Object.keys(where).length > 0) {
      queryOptions.where = where;
    }
    
    const datos = await this.indicadoresRepo.find(queryOptions);
    
    console.log(`Cálculo de estadísticas para ${periodo}: ${datos.length} registros`); // Debug
    
    if (datos.length === 0) {
      return {
        totalInstituciones: 0,
        totalEstudiantes: 0,
        totalCertificados: 0,
        totalProyectosInvestigacion: 0,
        totalTalleres: 0,
        totalInstitucionesArticuladas: 0,
        cantidadRegistros: 0,
      };
    }
    
    // Estadísticas específicas para TecnoAcademia
    return {
      totalInstituciones: datos.reduce((sum, item) => sum + (item.numInstituciones || 0), 0),
      totalEstudiantes: datos.reduce((sum, item) => sum + (item.numEstudiantesMatriculados || 0), 0),
      totalCertificados: datos.reduce((sum, item) => sum + (item.aprendicesCertificados || 0), 0),
      totalProyectosInvestigacion: datos.reduce((sum, item) => sum + (item.proyectosInvestigacion || 0), 0),
      totalTalleres: datos.reduce((sum, item) => sum + (item.numTalleres || 0), 0),
      totalInstitucionesArticuladas: datos.reduce((sum, item) => sum + (item.instArticuladas || 0), 0),
      cantidadRegistros: datos.length,
    };
  }

  private obtenerFiltroFecha(periodo: string) {
    // CORRECCIÓN: Usar fecha actual dinámica
    const hoy = new Date();
    
    // OPCIONAL: Si quieres forzar 2025 para ver todos tus datos de prueba
    // const hoy = new Date('2025-11-01'); // Solo para testing con tus datos
    
    console.log(`Fecha base para filtro ${periodo}: ${hoy.toISOString()}`); // Debug
    
    switch (periodo) {
      case 'semana':
        // Obtener inicio de semana (lunes)
        const inicioSemana = new Date(hoy);
        // getDay() devuelve 0 (domingo) a 6 (sábado)
        // Calculamos el lunes de esta semana
        const diffLunes = inicioSemana.getDay() === 0 ? -6 : 1 - inicioSemana.getDay();
        inicioSemana.setDate(hoy.getDate() + diffLunes);
        inicioSemana.setHours(0, 0, 0, 0);
        
        // Obtener fin de semana (domingo)
        const finSemana = new Date(inicioSemana);
        finSemana.setDate(inicioSemana.getDate() + 6);
        finSemana.setHours(23, 59, 59, 999);
        
        console.log(`Semana: ${inicioSemana.toISOString()} a ${finSemana.toISOString()}`);
        
        return {
          fecha: Between(
            inicioSemana,
            finSemana
          ),
        };

      case 'mes':
        // Obtener inicio del mes actual
        const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
        inicioMes.setHours(0, 0, 0, 0);
        
        // Obtener fin del mes actual
        const finMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);
        finMes.setHours(23, 59, 59, 999);
        
        console.log(`Mes: ${inicioMes.toISOString()} a ${finMes.toISOString()}`);
        
        return {
          fecha: Between(
            inicioMes,
            finMes
          ),
        };

      case 'año':
        // Obtener inicio del año actual
        const inicioAno = new Date(hoy.getFullYear(), 0, 1);
        inicioAno.setHours(0, 0, 0, 0);
        
        // Obtener fin del año actual
        const finAno = new Date(hoy.getFullYear(), 11, 31);
        finAno.setHours(23, 59, 59, 999);
        
        // ALTERNATIVA: Si quieres siempre 2025 (para ver todos tus datos)
        // const inicioAno = new Date(2025, 0, 1);
        // const finAno = new Date(2025, 11, 31);
        
        console.log(`Año: ${inicioAno.toISOString()} a ${finAno.toISOString()}`);
        
        return {
          fecha: Between(
            inicioAno,
            finAno
          ),
        };

      case 'todos': // Opcional: agregar para obtener todos los datos sin filtro
        console.log('Sin filtro de fecha (todos)');
        return null;

      default:
        console.log(`Período no reconocido: ${periodo}, usando semana por defecto`);
        // Por defecto, usar semana
        const inicioDefault = new Date(hoy);
        inicioDefault.setDate(hoy.getDate() - hoy.getDay() + 1);
        inicioDefault.setHours(0, 0, 0, 0);
        
        const finDefault = new Date(hoy);
        finDefault.setDate(hoy.getDate() - hoy.getDay() + 7);
        finDefault.setHours(23, 59, 59, 999);
        
        return {
          fecha: Between(
            inicioDefault,
            finDefault
          ),
        };
    }
  }

  // Método adicional para debugging
  async obtenerTodosLosDatos() {
    return this.indicadoresRepo.find({
      order: { fecha: 'ASC' },
      take: 50, // Limitar para no sobrecargar
    });
  }
}