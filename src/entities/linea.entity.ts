import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Nodo } from './nodo.entity';
import { User } from './user.entity';

@Entity('lineas')
export class Linea {
  @PrimaryGeneratedColumn({ name: 'id_linea' })
  idLinea!: number;

  @Column({ name: 'nombre_linea', type: 'varchar', length: 100 })
  nombreLinea!: string;

  @ManyToOne(() => Nodo, (nodo) => nodo.lineas, { nullable: false, eager: true })
  @JoinColumn({ name: 'id_nodo' })
  nodo!: Nodo;

  @OneToMany(() => User, (user) => user.linea)
  usuarios!: User[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}