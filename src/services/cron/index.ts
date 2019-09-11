import { CronJob } from "cron";
import config from "../../config";
import { MailSender } from "../mailSender";
import { DB } from "../../db";

export class CronScheduler {
  public static init() {
    const mailer = new MailSender();
    const mailScheduler = new CronJob(`*/${config.sendFrequencyInMinutes} * * * *`, () => {
      DB.Models.ScheduledMessage.find({ sentDate: null }, (err, docs) => {
        docs.map(async d => {
          await mailer.send({
            from: d.originAddress,
            html: d.messageData,
            to: d.recipientAddress
          });
          d.sentDate = new Date();
          d.save();
        });
      });
    });
    mailScheduler.start();
  }
}
