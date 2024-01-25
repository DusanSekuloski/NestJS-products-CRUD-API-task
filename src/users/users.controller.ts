import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/usersDto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    return this.usersService.getAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return this.usersService.getById(id);
  }

  @UseGuards(JwtGuard)
  @Put('update')
  async updateUser(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    const id = req.user.id;
    await this.usersService.update(id, updateUserDto);
    return { status: 'User updated successfully', statusCode: 200 };
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: number) {
    await this.usersService.delete(id);
    return { status: 'User deleted successfully', statusCode: 204 };
  }
}
