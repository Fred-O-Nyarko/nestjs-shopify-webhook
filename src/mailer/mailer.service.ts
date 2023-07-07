/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@nestjs/common';
import * as FormData from 'form-data';
import Mailgun, { MailgunMessageData } from 'mailgun.js';

@Injectable()
export class MailerService {
  get client() {
    const mg = new Mailgun(FormData);
    return mg.client({
      username: 'api',
      public_key: process.env.MAILGUN_PUBLIC_API_KEY!,
      key: process.env.MAILGUN_PRIVATE_API_KEY!,
    });
  }

  async sendMail(options: MailgunMessageData) {
    this.client.messages.create(process.env.MAILGUN_DOMAIN!, {
      ...options,
      from: `Mailgun Sandbox <postmaster@${process.env.MAILGUN_DOMAIN!}>`,
    });
  }
}
