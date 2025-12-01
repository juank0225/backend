import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('indicadores_laboratorio')
export class IndicadoresLaboratorio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ name: 'plazos_cumplidos', default: 0 })
  plazosCumplidos: number;

  @Column({ name: 'satisfaccion_cliente', type: 'decimal', precision: 5, scale: 2, default: 0 })
  satisfaccionCliente: number;

  @Column({ name: 'capacitacion_personal', default: 0 })
  capacitacionPersonal: number;

  @Column({ name: 'competencias_personal', default: 0 })
  competenciasPersonal: number;

  @Column({ name: 'mantenimiento_equipos', default: 0 })
  mantenimientoEquipos: number;

  @Column({ name: 'confidencialidad_imparcialidad', default: 0 })
  confidencialidadImparcialidad: number;

  @Column({ name: 'atencion_aprendices', default: 0 })
  atencionAprendices: number;

  @Column({ name: 'practicas_aprendices', default: 0 })
  practicasAprendices: number;

  @Column({ name: 'usuarios_externos', default: 0 })
  usuariosExternos: number;

  @Column({ name: 'apoyo_emprendedores', default: 0 })
  apoyoEmprendedores: number;

  @Column({ name: 'proyectos_mejora', default: 0 })
  proyectosMejora: number;

  @Column({ name: 'ventas_costos', type: 'decimal', precision: 10, scale: 2, default: 0 })
  ventasCostos: number;

  @Column({
    name: 'tipo_registro',
    type: 'enum',
    enum: ['diario', 'acumulado'],
    default: 'diario'
  })
  tipoRegistro: string;

  @Column({ length: 50, nullable: true })
  unidad: string;

  @Column({ type: 'text', nullable: true })
  observaciones: string;

  @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}