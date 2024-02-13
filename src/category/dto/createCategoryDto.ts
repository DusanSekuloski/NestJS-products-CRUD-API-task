import { IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCategoryDto {
  @IsString()
  categoryName: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
