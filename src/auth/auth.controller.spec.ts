import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

describe('AuthController', () => {
  let authController: AuthController;

  const mockUserService = {
    findByEmail: jest.fn(),
    register: jest.fn(),
    getById: jest.fn(),
    getAll: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, JwtService, UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();
    authController = module.get<AuthController>(AuthController);
  });

  it('register => should register a user', async () => {
    const dto = {
      firstName: 'Dulo',
      lastName: 'Sekuloski',
      email: 'dulko@gmail.com',
      password: 'qwerty123',
    };

    expect(await authController.registerUser(dto)).toEqual({
      status: 'User registered successfully',
      statusCode: 201,
    });
  });
});
