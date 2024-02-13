import { IsNumber, IsOptional } from 'class-validator';

export class UpdateProductQuantityDto {
  @IsOptional()
  @IsNumber()
  productQuantity: number;
}
