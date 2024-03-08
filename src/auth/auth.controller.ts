import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { CreateUserDto } from '../user/dto/createUserDto';
import { UserService } from '../user/user.service';
import { RefreshJwtGuard } from '../auth/guards/refresh-jwt.guard';
import { MagicLoginStrategy } from './strategies/magic-login-strategy';
import { MagicLoginGuard } from './guards/magic-login.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private magicLoginStrategy: MagicLoginStrategy,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login-password')
  async loginWithPassword(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Post('login-magic-link')
  async loginWithMagicLink(@Request() req, @Response() res) {
    return this.magicLoginStrategy.send(req, res);
  }

  @UseGuards(MagicLoginGuard)
  @Get('login-magic-link/callback')
  callback(@Req() req) {
    return this.authService.createNewAccessToken(req.user);
  }

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    await this.userService.register(createUserDto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    return await this.authService.createNewAccessToken(req.user);
  }
}
