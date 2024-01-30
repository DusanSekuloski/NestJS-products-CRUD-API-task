import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from 'src/users/dto/createUserDto';
import { UsersService } from 'src/users/users.service';
import { RefreshJwtGuard } from './guards/refresh-jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    const existingUser = await this.usersService.findByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      return { status: 'Error: that email already exists', statusCode: 409 };
    }
    await this.usersService.register(createUserDto);
    return { status: 'User registered successfully', statusCode: 201 };
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    return await this.authService.createNewAccessToken(req.user);
  }
}
