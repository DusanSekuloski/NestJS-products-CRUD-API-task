import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/entities/users.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: Users) {
    const { id, email } = user;
    const payload = {
      id: user.id,
      email: user.email,
    };
    return {
      email,
      id,
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.ACCESS_TOKEN_SECRET,
      }),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '7d',
        secret: process.env.REFRESH_TOKEN_SECRET,
      }),
    };
  }

  async createNewAccessToken(user: Users) {
    const { email, id } = user;
    const payload = {
      id: user.id,
      email: user.email,
    };
    return {
      email,
      id,
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }
}
