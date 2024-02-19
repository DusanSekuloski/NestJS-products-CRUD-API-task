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
import { UserService } from '../user/user.service';
import { UpdateUserDto } from '../user/dto/updateUserDto';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return this.userService.getAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return this.userService.getById(id);
  }

  @UseGuards(JwtGuard)
  @Put('update')
  async updateUser(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    const id = req.user.id;
    await this.userService.update(id, updateUserDto);
    return { status: 'User updated successfully', statusCode: 200 };
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: number) {
    await this.userService.delete(id);
    return { status: 'User deleted successfully', statusCode: 204 };
  }
}
