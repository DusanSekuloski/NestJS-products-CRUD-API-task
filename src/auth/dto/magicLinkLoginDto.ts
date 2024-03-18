import { IsEmail } from 'class-validator';

export class MagicLoginLinkDto {
  @IsEmail()
  destination: string;
}
