import { IsNotEmpty } from 'class-validator';
import { OrderProductDto } from './orderProductDto';

export class CreateOrderDto {
  @IsNotEmpty()
  orderProducts: OrderProductDto[];
}
