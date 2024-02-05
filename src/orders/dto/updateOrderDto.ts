import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './createOrderDto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
