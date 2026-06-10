import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'tu-clave-secreta-temporal',
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.sub,
      correo: payload.correo,
      rol: payload.rol,
      lineaId: payload.lineaId,
    };
  }
}