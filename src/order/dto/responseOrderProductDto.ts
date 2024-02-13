import { Exclude, Expose } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class ResponseOrderProductDto {
  @IsNumber()
  @Expose()
  product_id: number;

  @Exclude()
  order_id: number;
}
