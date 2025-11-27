import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('lineas')
export class Linea {
  @PrimaryGeneratedColumn({ name: 'id_linea' })
  id: number;

  @Column({ name: 'nombre_linea', length: 50, unique: true })
  nombreLinea: string;

  @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}