import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { CreateUserDto } from '../user/dto/createUserDto';
import { UserService } from '../user/user.service';
import { RefreshJwtGuard } from '../auth/guards/refresh-jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      return { status: 'Error: that email already exists', statusCode: 409 };
    }
    await this.userService.register(createUserDto);
    return { status: 'User registered successfully', statusCode: 201 };
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    return await this.authService.createNewAccessToken(req.user);
  }
}
