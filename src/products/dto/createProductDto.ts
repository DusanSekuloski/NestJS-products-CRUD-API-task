import { IsNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  short_description: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  product_quantity: string;

  @IsNumber()
  category_id: number;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
