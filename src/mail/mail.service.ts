import { Injectable } from '@nestjs/common';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { SendEmailDto } from './dto/sendEmailDto';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(dto: SendEmailDto): Promise<SMTPTransport.SentMessageInfo> {
    const { from, recipients, subject } = dto;

    const options: ISendMailOptions = {
      from: from ?? {
        name: process.env.APP_NAME,
        address: process.env.DEFAULT_NAME_FROM,
      },
      to: recipients,
      subject,
      template: 'welcome',
      context: {
        info: dto,
      },
    };
    try {
      const result: SMTPTransport.SentMessageInfo =
        await this.mailerService.sendMail(options);
      return result;
    } catch (err) {
      console.log('Error', err);
    }
  }
}
