import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/createUserDto';

describe('AuthController', () => {
  let authController: AuthController;

  const mockUserService = {
    register: jest.fn((dto: CreateUserDto) => dto),
  };

  const createUserDto: CreateUserDto = {
    firstName: 'Petar',
    lastName: 'Petrovic',
    email: 'petrovic@gmail.com',
    password: 'xyz123',
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

  it('registerUser => should call register function with the correct argument type', async () => {
    await authController.registerUser(createUserDto);
    expect(mockUserService.register).toBeDefined();
    expect(mockUserService.register).toHaveBeenCalledWith(
      expect.objectContaining(createUserDto),
    );
    expect(mockUserService.register).toHaveBeenCalled();
  });

  // it.skip('register => should not register a user with an existing email and return status 409 ', async () => {
  //   const result = await authController.registerUser(createUserDto1);
  //   expect(result).toEqual({
  //     status: 'Error: that email already exists',
  //     statusCode: 409,
  //   });
  //   expect(mockUserService.register).toHaveBeenCalledWith(createUserDto1);
  // });
});
