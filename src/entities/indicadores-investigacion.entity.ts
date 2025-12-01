import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('indicadores_investigacion')
export class IndicadoresInvestigacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ default: 0 })
  proyectos: number;

  @Column({ default: 0 })
  publicaciones: number;

  @Column({ default: 0 })
  prototipos: number;

  @Column({ default: 0 })
  colaboraciones: number;

  @Column({ default: 0 })
  investigadores: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  financiamiento: number;

  @Column({ default: 0 })
  patentes: number;

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