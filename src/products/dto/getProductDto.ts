import { Expose, Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { ResponseCategoryDto } from '../../categories/dto/responseCategoryDto';

export class GetProductDto {
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
  price: number;

  @IsString()
  @Expose()
  product_quantity: string;

  @Expose()
  @Type(() => ResponseCategoryDto)
  category: ResponseCategoryDto;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;
}
