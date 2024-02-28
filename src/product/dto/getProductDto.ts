import { Expose, Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { ResponseCategoryDto } from '../../category/dto/responseCategoryDto';

export class GetProductDto {
  @IsNumber()
  id: number;

  @IsString()
  @Expose()
  name: string;

  @IsString()
  @Expose()
  shortDescription: string;

  @IsString()
  @Expose()
  description: string;

  @IsNumber()
  @Expose()
  productPrice: number;

  @IsNumber()
  @Expose()
  productQuantity: number;

  @Expose()
  @Type(() => ResponseCategoryDto)
  category: ResponseCategoryDto;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
