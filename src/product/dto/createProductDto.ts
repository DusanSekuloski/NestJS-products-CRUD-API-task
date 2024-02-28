import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  shortDescription: string;

  @IsString()
  description: string;

  @IsNumber()
  productPrice: number;

  @IsNumber()
  productQuantity: number;

  @IsNumber()
  categoryId: number;
}
