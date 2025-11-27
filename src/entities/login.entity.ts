import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('logins')
export class Login {
  @PrimaryGeneratedColumn({ name: 'id_login' })
  id: number;

  @Column({ length: 255, unique: true })
  usuario: string;

  @Column({ name: 'password_hash' })
  passwordHash: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'id_usuario' })
  user: User;

  @Column({ name: 'last_login', type: 'datetime', nullable: true })
  lastLogin: Date;

  @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}