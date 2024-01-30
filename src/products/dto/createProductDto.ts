import { IsNumber, IsString } from 'class-validator';

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
