import { IsNotEmpty } from 'class-validator';
import { ProductToOrderDto } from './productToOrderDto';

export class CreateOrderDto {
  @IsNotEmpty()
  order_products: ProductToOrderDto[];
}
