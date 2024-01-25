import { Optional } from '@nestjs/common';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
export class UpdateUserDto {
  @Optional()
  @IsString()
  first_name: string;

  @Optional()
  @IsString()
  last_name: string;
}
