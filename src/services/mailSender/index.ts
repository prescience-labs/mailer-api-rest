import nodemailer from "nodemailer";
import mg from "nodemailer-mailgun-transport";
import Mail from "nodemailer/lib/mailer";
import { MailOptions } from "nodemailer/lib/sendmail-transport";
import config from "../../config";
export class MailSender {
  private transports: Mail[] = [];

  constructor() {
    this.init();
  }

  public send(options: MailOptions) {
    return this.transports.map(t => t.sendMail(options));
  }

  private init() {
    this.transports.push(
      nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: "deanna.gorczany52@ethereal.email",
          pass: "3QSeaY1Xr7qsTtkR9s"
        }
      })
    );
    const auth = {
      auth: {
        api_key: config.mailgunAPIKey,
        domain: config.mailgunSenderDomain
      }
    };
    this.transports.push(nodemailer.createTransport(mg(auth)));
  }
}
