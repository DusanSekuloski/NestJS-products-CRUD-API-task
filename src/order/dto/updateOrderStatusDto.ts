import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateOrderStatusDto {
  @IsString()
  @IsOptional()
  orderStatus: string;

  @IsNumber()
  @IsOptional()
  orderId: number;
}
