import { IsNotEmpty } from 'class-validator';
import { OrderProductDto } from '../dto/orderProductDto';
import { Optional } from '@nestjs/common';

export class CreateOrderDto {
  @Optional()
  orderId: number;

  @IsNotEmpty()
  orderProducts: OrderProductDto[];
}
