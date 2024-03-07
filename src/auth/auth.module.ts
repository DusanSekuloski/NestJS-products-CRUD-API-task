import { Module } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { AuthController } from '../auth/auth.controller';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/users.entity';
import { LocalStrategy } from '../auth/strategies/local-strategy';
import { JwtStrategy } from '../auth/strategies/jwt-strategy';
import { RefreshJwtStrategy } from '../auth/strategies/refreshToken-strategy';
import { MailService } from '../mail/mail.service';
import { MagicLoginStrategy } from './strategies/magic-login-strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET,
    }),
    JwtModule.register({
      secret: process.env.REFRESH_TOKEN_SECRET,
    }),
    JwtModule.register({
      secret: process.env.MAGIC_LINK_TOKEN_SECRET,
    }),
  ],
  providers: [
    AuthService,
    UserService,
    MailService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
    MagicLoginStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
