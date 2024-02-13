import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  short_description: string;

  @IsString()
  description: string;

  @IsNumber()
  product_price: number;

  @IsNumber()
  product_quantity: number;

  @IsNumber()
  category_id: number;
}
