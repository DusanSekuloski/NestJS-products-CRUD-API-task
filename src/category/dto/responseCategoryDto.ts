import { Expose, Exclude } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

@Exclude()
export class ResponseCategoryDto {
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
}
