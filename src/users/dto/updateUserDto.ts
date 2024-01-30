import { Optional } from '@nestjs/common';
import { IsString } from 'class-validator';

export class UpdateUserDto {
  @Optional()
  @IsString()
  first_name: string;

  @Optional()
  @IsString()
  last_name: string;
}
