import { IsArray, IsNumber, IsOptional } from 'class-validator';

export class OrderProductDto {
  @IsOptional()
  @IsNumber()
  order_id: number;

  @IsArray()
  product_id: number;

  @IsNumber()
  product_price: number;

  @IsNumber()
  product_quantity: number;
}
