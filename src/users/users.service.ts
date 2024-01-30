import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUserDto';
import { UpdateUserDto } from './dto/updateUserDto';
import { GetUserDto } from './dto/getUserDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const newUser = await this.usersRepository.create(createUserDto);
    await this.usersRepository.save(newUser);
  }

  async findByEmail(email: string): Promise<Users | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async getById(id: number) {
    const oneUser = await this.usersRepository.findOne({
      where: { id: id },
    });
    if (!oneUser) {
      throw new NotFoundException('User with that id does not exist');
    }

    const userDto = new GetUserDto(oneUser);
    return userDto;
  }

  async getAll() {
    const allUsers = await this.usersRepository.find();
    const usersDto = allUsers.map((user) => new GetUserDto(user));
    return usersDto;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(id, updateUserDto);
  }

  async delete(id: number) {
    await this.getById(id);
    await this.usersRepository.delete(id);
  }
}
