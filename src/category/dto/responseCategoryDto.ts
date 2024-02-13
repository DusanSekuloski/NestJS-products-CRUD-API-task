import { Expose, Exclude } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

@Exclude()
export class ResponseCategoryDto {
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
}
