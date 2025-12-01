import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('indicadores_tecnoacademia')
export class IndicadoresTecnoAcademia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ name: 'num_instituciones', default: 0 })
  numInstituciones: number;

  @Column({ name: 'inst_articuladas', default: 0 })
  instArticuladas: number;

  @Column({ name: 'num_estudiantes_matriculados', default: 0 })
  numEstudiantesMatriculados: number;

  @Column({ name: 'aprendices_certificados', default: 0 })
  aprendicesCertificados: number;

  @Column({ name: 'proyectos_investigacion', default: 0 })
  proyectosInvestigacion: number;

  @Column({ name: 'aprendices_cadena_formativa', default: 0 })
  aprendicesCadenaFormativa: number;

  @Column({ default: 0 })
  edts: number;

  @Column({ name: 'proyectos_tecnologicos_abp', default: 0 })
  proyectosTecnologicosAbp: number;

  @Column({ name: 'estudiantes_destacados', default: 0 })
  estudiantesDestacados: number;

  @Column({ default: 0 })
  mentorias: number;

  @Column({ name: 'participacion_ferias', default: 0 })
  participacionFerias: number;

  @Column({ name: 'visitas_centros_formacion', default: 0 })
  visitasCentrosFormacion: number;

  @Column({ name: 'actividades_innovacion', default: 0 })
  actividadesInnovacion: number;

  @Column({ name: 'num_talleres', default: 0 })
  numTalleres: number;

  @Column({ name: 'proyectos_integrados', default: 0 })
  proyectosIntegrados: number;

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