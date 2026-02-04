import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaUsuariosService } from '../prisma/prisma-usuarios.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaUsuariosService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'CHANGE_THIS_SECRET',
    });
  }

  async validate(payload: any) {
    // attach minimal user info to request
    const user = await (this.prisma as any).user.findUnique({ where: { id: payload.sub } });
    if (!user) return null;
    const { password, ...rest } = user;
    return rest;
  }
}
