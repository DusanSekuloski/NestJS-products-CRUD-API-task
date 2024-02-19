import { Test } from '@nestjs/testing';
import { UserService } from '../user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/users.entity';
import { CreateUserDto } from '../user/dto/createUserDto';

describe(' Test suite', () => {
  let userService: UserService;

  const mockUserRepository = {
    save: jest.fn(),
    create: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('register => should create a new user in the database', async () => {
    const createUserDto = {
      firstName: 'Dulo',
      lastName: 'Sekuloski',
      email: 'dulko@gmail.com',
      password: 'qwerty123',
    } as CreateUserDto;
    const user = {
      firstName: 'Dulo',
      lastName: 'Sekuloski',
      email: 'dulko@gmail.com',
      password: 'qwerty123',
    } as unknown as User;

    jest.spyOn(mockUserRepository, 'save').mockReturnValue(user);

    const result = await userService.register(createUserDto);

    expect(mockUserRepository.save).toHaveBeenCalled();
    expect(result).toEqual(user);
  });
});
