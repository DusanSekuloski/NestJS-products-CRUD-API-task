import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UpdateUserDto } from '../user/dto/updateUserDto';
import { UserController } from './user.controller';
import { GetUserDto } from './dto/getUserDto';

describe('UserController', () => {
  let userController: UserController;

  const mockUserService = {
    getById: jest.fn((id) => {
      if (id === mockGetOneUser.id) {
        return mockGetOneUser;
      }
      return null;
    }),
    getAll: jest.fn(() => Promise.resolve(mockGetAllUsers)),
    update: jest.fn(
      (id: number, updateUserDto: UpdateUserDto) => updateUserDto,
    ),
    delete: jest.fn((id) => id),
  };
  const mockGetAllUsers: GetUserDto[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      createdAt: new Date(),
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      createdAt: new Date(),
    },
  ];

  const mockGetOneUser: GetUserDto = {
    id: 5,
    firstName: 'Marko',
    lastName: 'Markovic',
    email: 'markovic@example.com',
    createdAt: new Date(),
  };

  const mockUpdateUser: UpdateUserDto = {
    firstName: 'Pera',
    lastName: 'Peric',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [JwtService, UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();
    userController = module.get<UserController>(UserController);
  });

  it('getAllUsers => should return all users', async () => {
    const result = await userController.getAllUsers();

    expect(result).toEqual(mockGetAllUsers);
    expect(mockUserService.getAll).toHaveBeenCalled();
  });

  it('getAllUsers => should not return any user if none exist', async () => {
    mockUserService.getAll.mockResolvedValue(null);
    const result = await userController.getAllUsers();
    expect(result).toEqual(null);
    expect(mockUserService.getAll).toHaveBeenCalled();
  });

  it('getUserById => should return user with specified id', async () => {
    const result = await userController.getUserById(mockGetOneUser.id);
    expect(result).toEqual(mockGetOneUser);
    expect(mockUserService.getById).toHaveBeenCalled();
  });

  it('getUserById => should return null value if user with specified id does not exist', async () => {
    const result = await userController.getUserById(123);
    expect(result).toEqual(null);
    expect(mockUserService.getById).toHaveBeenCalled();
  });

  it('updateUser => should update user with existing id', async () => {
    const req = {
      user: { id: 5 },
    };

    await userController.updateUser(req, mockUpdateUser);
    expect(mockUserService.update).toHaveBeenCalledWith(
      req.user.id,
      mockUpdateUser,
    );
  });
  // WIP
  it.skip('updateUser => should not update user with null id', async () => {
    const req = {
      user: { id: null },
    };

    await userController.updateUser(req, mockUpdateUser);
    expect(mockUserService.update).not.toHaveBeenCalled();
  });
});
