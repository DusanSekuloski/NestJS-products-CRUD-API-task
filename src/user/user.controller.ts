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
import { GetUserDto } from './dto/getUserDto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<GetUserDto[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<GetUserDto> {
    return this.userService.getById(id);
  }

  @UseGuards(JwtGuard)
  @Put('update')
  async updateUser(
    @Req() req: { user: { id: number } },
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const id: number = req.user.id;
    await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: number) {
    await this.userService.delete(id);
  }
}
