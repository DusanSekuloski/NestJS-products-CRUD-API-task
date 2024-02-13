import { IsNumber, IsOptional } from 'class-validator';

export class UpdateProductQuantityDto {
  @IsOptional()
  @IsNumber()
  product_quantity: number;
}
