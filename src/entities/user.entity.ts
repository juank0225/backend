import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from './role.entity';
import { Linea } from './linea.entity';

@Entity('usuarios')
export class User {
  @PrimaryGeneratedColumn({ name: 'id_usuario' })
  id!: number;

  @Column({ length: 100 })
  nombre!: string;

  @Column({ length: 100 })
  apellido!: string;

  @Column({ length: 255, unique: true })
  correo!: string;

  @Column({ length: 20, nullable: true })
  celular?: string;

  @Column({
    name: 'tipo_doc',
    type: 'enum',
    enum: ['CC', 'CE', 'TI', 'PASAPORTE']
  })
  tipoDoc!: string;

  @Column({ name: 'num_doc', length: 50, unique: true })
  numDoc!: string;

  @Column({
    type: 'enum',
    enum: ['Activo', 'Inactivo'],
    default: 'Activo'
  })
  estado!: string;

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  @JoinColumn({ name: 'id_rol' })
  rol!: Role;

  @ManyToOne(() => Linea, (linea) => linea.usuarios, { nullable: true, eager: true })
  @JoinColumn({ name: 'id_linea' })
  linea!: Linea | null;

  @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;
}