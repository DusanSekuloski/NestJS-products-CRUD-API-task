import { IsArray, IsNumber, IsOptional } from 'class-validator';

export class ProductToOrderDto {
  @IsOptional()
  @IsArray()
  product_id: number[];

  @IsOptional()
  @IsNumber()
  order_id: number;

  @IsOptional()
  @IsNumber()
  product_price: number;

  @IsOptional()
  @IsNumber()
  quantity: number;
}
