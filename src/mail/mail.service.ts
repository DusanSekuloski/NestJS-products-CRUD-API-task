import { Injectable } from '@nestjs/common';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { MagicLoginLinkDto } from '../auth/dto/magicLinkLoginDto';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMagicLinkMail(
    dto: MagicLoginLinkDto,
  ): Promise<SMTPTransport.SentMessageInfo> {
    const { destination } = dto;

    const options: ISendMailOptions = {
      from: {
        name: process.env.APP_NAME,
        address: process.env.DEFAULT_NAME_FROM,
      },
      to: destination,
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
