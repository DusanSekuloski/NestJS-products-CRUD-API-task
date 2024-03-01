import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { SendEmailDto } from './dto/sendEmailDto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  sendMail(@Body() dto: SendEmailDto): Promise<SMTPTransport.SentMessageInfo> {
    return this.mailService.sendMail(dto);
  }
}
