import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('indicadores_tecnoparque')
export class IndicadoresTecnoParque {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ type: 'int', default: 0 })
  proyectos: number;

  @Column({ type: 'int', default: 0 })
  articulaciones: number;

  @Column({ type: 'int', default: 0 })
  visitas: number;

  @Column({ type: 'int', default: 0 })
  giras: number;

  @Column({ type: 'int', default: 0 })
  asesorias: number;

  @Column({
    name: 'tipo_registro',
    type: 'enum',
    enum: ['diario', 'acumulado'],
    default: 'diario',
  })
  tipoRegistro: 'diario' | 'acumulado';

  @Column({ type: 'varchar', length: 50, nullable: true })
  unidad?: string;

  @Column({ type: 'text', nullable: true })
  observaciones?: string;

  @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}