import { Optional } from '@nestjs/common';
import { IsString } from 'class-validator';

export class UpdateUserDto {
  @Optional()
  @IsString()
  firstName: string;

  @Optional()
  @IsString()
  lastName: string;
}
