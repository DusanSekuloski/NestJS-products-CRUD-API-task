import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateNonQuantityProductDetailsDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  shortDescription: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  productPrice: number;

  @IsOptional()
  @IsNumber()
  categoryId: number;
}
