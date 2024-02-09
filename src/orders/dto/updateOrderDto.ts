import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateOrderDto } from './createOrderDto';

export class UpdateOrderDto extends CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  order_id: number;
}
