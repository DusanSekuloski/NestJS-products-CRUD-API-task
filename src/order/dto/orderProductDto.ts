import { IsNumber, IsOptional } from 'class-validator';

export class OrderProductDto {
  @IsOptional()
  @IsNumber()
  orderId: number;

  @IsOptional()
  @IsNumber()
  productId: number;

  @IsOptional()
  @IsNumber()
  productPrice: number;

  @IsOptional()
  @IsNumber()
  productQuantity: number;
}
