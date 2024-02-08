import { IsArray, IsNumber, IsOptional } from 'class-validator';

export class OrderProductDto {
  @IsOptional()
  @IsArray()
  product_id: number;

  @IsOptional()
  product_price: number;

  @IsOptional()
  @IsNumber()
  product_quantity: number;
}
