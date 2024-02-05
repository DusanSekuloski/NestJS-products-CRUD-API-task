import { IsArray } from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  product_id: number[];
}
