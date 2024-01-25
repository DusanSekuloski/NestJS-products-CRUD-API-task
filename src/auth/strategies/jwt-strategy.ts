import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.ACCESS_TOKEN_SECRET}`,
    });
  }

  async validate(payload: any) {
    return { id: payload.id, email: payload.email };
  }
}
