import { Expose, Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { ResponseCategoryDto } from '../../categories/dto/responseCategoryDto';

export class GetProductDto {
  @IsNumber()
  id: number;

  @IsString()
  @Expose()
  name: string;

  @IsString()
  @Expose()
  short_description: string;

  @IsString()
  @Expose()
  description: string;

  @IsNumber()
  @Expose()
  product_price: number;

  @IsNumber()
  @Expose()
  product_quantity: number;

  @Expose()
  @Type(() => ResponseCategoryDto)
  category: ResponseCategoryDto;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;
}
