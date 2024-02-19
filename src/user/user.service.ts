import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../user/dto/createUserDto';
import { UpdateUserDto } from '../user/dto/updateUserDto';
import { GetUserDto } from '../user/dto/getUserDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const newUser = await this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async getById(id: number) {
    const oneUser = await this.userRepository.findOne({
      where: { id: id },
    });
    if (!oneUser) {
      throw new NotFoundException('User with that id does not exist');
    }

    const userDto = new GetUserDto(oneUser);
    return userDto;
  }

  async getAll() {
    const allUsers = await this.userRepository.find();
    const userDto = allUsers.map((user) => new GetUserDto(user));
    return userDto;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async delete(id: number) {
    await this.getById(id);
    await this.userRepository.delete(id);
  }
}
