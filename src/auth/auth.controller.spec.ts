import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuth = {
    registerUser: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, JwtService, UserService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuth)
      .compile();
    controller = module.get<AuthController>(AuthController);
  });

  it('should register a user', () => {
    expect(
      controller.registerUser({
        first_name: 'Dulo',
        last_name: 'Sekuloski',
        email: 'dulko@gmail.com',
        password: 'qwerty123',
      }),
    ).toEqual({
      email: 'dulko@gmail.com',
      password: 'qwerty123',
    });
  });
});
