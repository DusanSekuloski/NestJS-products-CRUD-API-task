import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-magic-login';

export class MagicLoginStrategy extends PassportStrategy(
  Strategy,
  'magic-login',
) {
  constructor() {
    super({
      secret: `${process.env.ACCESS_TOKEN_SECRET}`,
      jwtOptions: { expiresIn: '30min' },
      callbackUrl: `${process.env.CALLBACK_URL}`,
    });
  }
}
