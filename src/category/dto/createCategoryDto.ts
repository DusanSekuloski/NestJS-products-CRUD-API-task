import { IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCategoryDto {
  @IsString()
  category_name: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
