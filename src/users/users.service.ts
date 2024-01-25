import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/usersDto';

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
    return await this.usersRepository.findOne({
      where: { id: id },
    });
  }

  async getAll() {
    return await this.usersRepository.find();
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(id, updateUserDto);
  }

  async delete(id: number) {
    await this.usersRepository.delete(id);
  }
}
