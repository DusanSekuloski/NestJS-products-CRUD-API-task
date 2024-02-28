import { Expose } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class ResponseProductDto {
  @IsNumber()
  @Expose()
  id: number;

  @IsString()
  @Expose()
  name: string;

  @IsString()
  @Expose()
  shortDescription: string;

  @IsString()
  @Expose()
  description: string;

  @IsNumber()
  @Expose()
  productPrice: number;

  @IsNumber()
  @Expose()
  productQuantity: number;

  @Expose()
  @IsDate()
  createdAt: Date;

  @Expose()
  @IsDate()
  updatedAt: Date;
}
