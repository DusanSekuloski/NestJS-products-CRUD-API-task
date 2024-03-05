import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { CreateUserDto } from '../user/dto/createUserDto';
import { UserService } from '../user/user.service';
import { RefreshJwtGuard } from '../auth/guards/refresh-jwt.guard';
// import { MagicLoginLinkDto } from './dto/magicLinkLoginDto';
//testing smth123
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login-password')
  async loginWithPassword(@Request() req) {
    return await this.authService.login(req.user);
  }
  //TODO: Create this function
  // @Post('login-magic-link')
  // async loginWithMagicLink(@Body() dto: MagicLoginLinkDto) {}

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
