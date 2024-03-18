import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-magic-login';
import { AuthService } from '../auth.service';
import { MailService } from '../../mail/mail.service';
import { User } from '../../entities/users.entity';

@Injectable()
export class MagicLoginStrategy extends PassportStrategy(
  Strategy,
  'magic-login',
) {
  constructor(
    private authService: AuthService,
    private mailService: MailService,
  ) {
    super({
      secret: process.env.MAGIC_LINK_TOKEN_SECRET,
      jwtOptions: { expiresIn: '30min' },
      callbackUrl: `${process.env.CALLBACK_URL}`,
      sendMagicLink: async (destination: string, href: string) => {
        await this.mailService.sendMailWithMagicLink(destination, href);
      },
      verify: async (payload, callback): Promise<Partial<User>> => {
        return callback(null, this.validate(payload));
      },
    });
  }

  validate(payload: { destination: string }) {
    const user = this.authService.magicValidateUser(payload.destination);
    return user;
  }
}
