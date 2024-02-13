import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateOrderStatusDto {
  @IsString()
  @IsOptional()
  order_status: string;

  @IsNumber()
  @IsOptional()
  order_id: number;
}
