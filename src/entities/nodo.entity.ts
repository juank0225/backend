import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Linea } from './linea.entity';

@Entity('nodos')
export class Nodo {
  @PrimaryGeneratedColumn({ name: 'id_nodo' })
  idNodo!: number;

  @Column({ name: 'nombre_nodo', type: 'varchar', length: 100, unique: true })
  nombreNodo!: string;

  @Column({ name: 'descripcion', type: 'varchar', length: 255, nullable: true })
  descripcion?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @OneToMany(() => Linea, (linea) => linea.nodo)
  lineas!: Linea[];
}