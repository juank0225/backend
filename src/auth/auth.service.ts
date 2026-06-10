import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Login } from '../entities/login.entity';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Login)
    private loginRepository: Repository<Login>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    private jwtService: JwtService,
  ) { }

  async login(loginDto: LoginDto) {
    const { correo, password } = loginDto;

    const user = await this.userRepository.findOne({
      where: { correo },
      relations: ['rol', 'linea', 'linea.nodo'],
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const login = await this.loginRepository.findOne({
      where: { user: { id: user.id } },
      relations: ['user', 'user.rol', 'user.linea', 'user.linea.nodo'],
    });

    if (!login || !bcrypt.compareSync(password, login.passwordHash)) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    login.lastLogin = new Date();
    await this.loginRepository.save(login);

    const payload = {
      sub: login.user.id,
      correo: login.user.correo,
      rol: login.user.rol?.nombreRol || null,
      lineaId: login.user.linea?.idLinea || null,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: login.user.id,
        nombre: login.user.nombre,
        apellido: login.user.apellido,
        correo: login.user.correo,
        estado: login.user.estado,
        rol: login.user.rol
          ? {
            id: login.user.rol.id,
            nombreRol: login.user.rol.nombreRol,
          }
          : null,
        linea: login.user.linea
          ? {
            idLinea: login.user.linea.idLinea,
            nombreLinea: login.user.linea.nombreLinea,
            nodo: login.user.linea.nodo
              ? {
                idNodo: login.user.linea.nodo.idNodo,
                nombreNodo: login.user.linea.nodo.nombreNodo,
              }
              : null,
          }
          : null,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const {
      nombre,
      apellido,
      correo,
      celular,
      tipoDoc,
      numDoc,
      password,
      lineaId,
    } = registerDto;

    const existeCorreo = await this.userRepository.findOne({
      where: { correo },
    });

    if (existeCorreo) {
      throw new BadRequestException('El correo ya está registrado');
    }

    const existeDocumento = await this.userRepository.findOne({
      where: { numDoc },
    });

    if (existeDocumento) {
      throw new BadRequestException('El número de documento ya está registrado');
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    const nuevoUsuario = this.userRepository.create({
      nombre,
      apellido,
      correo,
      celular,
      tipoDoc,
      numDoc,
      estado: 'Activo',
      rol: { id: 2 } as any,
      linea: lineaId ? ({ idLinea: lineaId } as any) : null,
    });

    const usuarioGuardado = await this.userRepository.save(nuevoUsuario);

    const nuevoLogin = this.loginRepository.create({
      passwordHash,
      user: usuarioGuardado,
    });

    await this.loginRepository.save(nuevoLogin);

    return {
      message: 'Usuario registrado correctamente',
      user: {
        id: usuarioGuardado.id,
        nombre: usuarioGuardado.nombre,
        apellido: usuarioGuardado.apellido,
        correo: usuarioGuardado.correo,
      },
    };
  }
}