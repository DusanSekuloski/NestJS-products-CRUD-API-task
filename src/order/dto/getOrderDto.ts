import { Expose, Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { ResponseOrderProductDto } from './responseOrderProductDto';

export class GetOrderDto {
  @IsNumber()
  @Expose()
  orderId: number;

  @IsNumber()
  @Expose()
  userId: number;

  @IsNumber()
  @Expose()
  totalAmount: number;

  @IsString()
  @Expose()
  orderStatus: string;

  @IsDate()
  @Expose()
  createdAt: Date;

  @IsDate()
  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => ResponseOrderProductDto)
  orderProduct: ResponseOrderProductDto[];
}
