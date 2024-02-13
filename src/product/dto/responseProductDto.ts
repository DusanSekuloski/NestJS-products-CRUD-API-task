import { Expose } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class ResponseProductDto {
  @IsNumber()
  @Expose()
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
  @IsDate()
  created_at: Date;

  @Expose()
  @IsDate()
  updated_at: Date;
}
