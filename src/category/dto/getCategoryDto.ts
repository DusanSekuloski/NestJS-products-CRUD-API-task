import { Expose, Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { ResponseProductDto } from 'src/product/dto/responseProductDto';

export class GetCategoryDto {
  @Expose()
  @IsNumber()
  categoryId: number;

  @IsString()
  @Expose()
  categoryName: string;

  @IsDate()
  @Expose()
  createdAt: Date;

  @IsDate()
  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => ResponseProductDto)
  category: ResponseProductDto;
}
