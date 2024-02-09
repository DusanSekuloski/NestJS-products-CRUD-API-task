import { IsNotEmpty } from 'class-validator';
import { OrderProductDto } from './orderProductDto';
import { Optional } from '@nestjs/common';

export class CreateOrderDto {
  @Optional()
  order_id: number;

  @IsNotEmpty()
  orderProducts: OrderProductDto[];
}
