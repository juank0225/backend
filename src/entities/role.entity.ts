import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn({ name: 'id_rol' })
  id: number;

  @Column({ name: 'nombre_rol', length: 50, unique: true })
  nombreRol: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}