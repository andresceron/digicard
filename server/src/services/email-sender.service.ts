import { Service } from 'typedi';
import sgMail from '@sendgrid/mail';
import Logger from '../loaders/logger';
import config from '../config/config';
import { EMAIL_TEMPLATES } from '../constants/constants';
import { IUser } from '../interfaces/user.interface';
import { InternalServerError } from '../helpers/api-error';


@Service()
export class EmailService {
  transporter: any;

  public async newRegister(user: IUser): Promise<any> {
    this.initMailerConfig();

    const mailData = {
      from: 'no-reply@socialar.app',
      template_id: EMAIL_TEMPLATES.welcome,
      personalizations: [
        {
          to: [
            {
              email: user.email
            }
          ],
          dynamic_template_data: {
            first_name: user.firstName
          }
        }
      ]
    }

    return await this.sendEmail(mailData);
  }

  public async resetPassword(user: IUser, resetToken: string): Promise<any> {
    this.initMailerConfig();

    Logger.info(`resetToken:: ${resetToken}`);

    const mailData = {
      from: 'no-reply@socialar.app',
      template_id: EMAIL_TEMPLATES.reset_password,
      personalizations: [
        {
          to: [
            {
              email: user.email
            }
          ],
          dynamic_template_data: {
            first_name: user.firstName,
            reset_token: `https://socialar.app/reset-password/${resetToken}`
          }
        }
      ]
    }

    return await this.sendEmail(mailData);
  }

  private async sendEmail(mailData: any) {
    try {
      const sendStatus = await sgMail.send(mailData);
      if (sendStatus) {
        Logger.info(`sendStatus:: ${sendStatus}`);
        return sendStatus;
      }
    } catch (err) {
      Logger.error(`resetToken:: ${err?.response?.body?.errors}`);
      throw new InternalServerError(err);
    }
  }

  private initMailerConfig() {
    sgMail.setApiKey(config.sendgrid.api);
  }
}