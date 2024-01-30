import { IsOptional, IsString } from 'class-validator';

export class UpdateProductQuantityDto {
  @IsOptional()
  @IsString()
  product_quantity: string;
}
