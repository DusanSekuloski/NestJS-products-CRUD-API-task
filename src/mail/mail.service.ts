import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  sendMail(): void {
    this.mailerService.sendMail({
      to: 'dulko@mailinator.com',
      from: 'kuldo@mailinator.com',
      subject: 'Vezbanje slanja mejlova sa NestJs-om',
      text: 'Pa pa',
      html: '<b> welcome <b>',
    });
  }
}
