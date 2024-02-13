import { Expose, Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { ResponseProductDto } from 'src/product/dto/responseProductDto';

export class GetCategoryDto {
  @Expose()
  @IsNumber()
  category_id: number;

  @IsString()
  @Expose()
  category_name: string;

  @IsDate()
  @Expose()
  created_at: Date;

  @IsDate()
  @Expose()
  updated_at: Date;

  @Expose()
  @Type(() => ResponseProductDto)
  category: ResponseProductDto;
}
