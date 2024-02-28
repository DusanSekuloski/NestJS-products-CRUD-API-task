import { Exclude, Expose } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class ResponseOrderProductDto {
  @IsNumber()
  @Expose()
  productId: number;

  @Exclude()
  orderId: number;
}
