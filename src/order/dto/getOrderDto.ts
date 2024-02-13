import { Expose, Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { ResponseOrderProductDto } from './responseOrderProductDto';

export class GetOrderDto {
  @IsNumber()
  @Expose()
  order_id: number;

  @IsNumber()
  @Expose()
  user_id: number;

  @IsNumber()
  @Expose()
  total_amount: number;

  @IsString()
  @Expose()
  order_status: string;

  @IsDate()
  @Expose()
  created_at: Date;

  @IsDate()
  @Expose()
  updated_at: Date;

  @Expose()
  @Type(() => ResponseOrderProductDto)
  order_product: ResponseOrderProductDto[];
}
