import { IsOptional, IsString } from 'class-validator';

export class UpdateProductQuantityDto {
  @IsOptional()
  @IsString()
  quantity: string;
}
