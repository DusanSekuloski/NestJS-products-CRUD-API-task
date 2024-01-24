import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  short_description: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  product_quantity: string;

  @IsNumber()
  category_id: number;
}

export class UpdateNonQuantityProductDetailsDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  short_description: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  category_id: number;
}

export class UpdateProductQuantityDto {
  @IsOptional()
  @IsString()
  product_quantity: string;
}
