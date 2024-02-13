import { IsNumber, IsOptional } from 'class-validator';

export class OrderProductDto {
  @IsOptional()
  @IsNumber()
  order_id: number;

  @IsOptional()
  @IsNumber()
  product_id: number;

  @IsOptional()
  @IsNumber()
  product_price: number;

  @IsOptional()
  @IsNumber()
  product_quantity: number;
}
