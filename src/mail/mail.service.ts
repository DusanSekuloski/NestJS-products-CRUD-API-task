import { Injectable } from '@nestjs/common';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly authService: AuthService,
  ) {}

  async sendMailWithMagicLink(
    destination: string,
    href: string,
  ): Promise<SMTPTransport.SentMessageInfo> {
    await this.authService.magicValidateUser(destination);

    const options: ISendMailOptions = {
      from: {
        name: process.env.APP_NAME,
        address: process.env.DEFAULT_NAME_FROM,
      },
      to: destination,
      template: 'welcome',
      context: {
        destination,
        href,
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
