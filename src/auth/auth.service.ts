import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Login } from '../entities/login.entity';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Login)
    private loginRepository: Repository<Login>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { usuario, password } = loginDto;

    const login = await this.loginRepository.findOne({
      where: { usuario },
      relations: ['user', 'user.rol', 'user.linea'],
    });

    if (!login || !bcrypt.compareSync(password, login.passwordHash)) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    // Actualizar last_login
    login.lastLogin = new Date();
    await this.loginRepository.save(login);

    const payload = { 
      sub: login.user.id, 
      usuario: login.usuario,
      rol: login.user.rol.nombreRol 
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: login.user,
    };
  }
}