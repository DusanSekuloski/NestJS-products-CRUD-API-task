import { IsOptional, IsString, IsNumber } from 'class-validator';

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
