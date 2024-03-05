import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { MagicLoginLinkDto } from '../auth/dto/magicLinkLoginDto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  sendMail(
    @Body() dto: MagicLoginLinkDto,
  ): Promise<SMTPTransport.SentMessageInfo> {
    return this.mailService.sendMagicLinkMail(dto);
  }
}
