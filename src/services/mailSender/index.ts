import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { MailOptions } from "nodemailer/lib/sendmail-transport";
export class MailSender {
  private transporter: Mail;

  constructor() {
    this.init();
  }

  private init() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "deanna.gorczany52@ethereal.email",
        pass: "3QSeaY1Xr7qsTtkR9s"
      }
    });
  }

  public send(options: MailOptions) {
    return this.transporter.sendMail(options);
  }
}
