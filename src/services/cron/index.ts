import { CronJob } from "cron";
import config from "../../config";
import { DB } from "../../db";
import { appLogger } from "../../log";
import { MailSender } from "../mailSender";
import axios from 'axios'
export class CronScheduler {
  public static init() {
    const mailer = new MailSender();
    const mailScheduler = new CronJob(
      config.isProduction
        ? `*/${config.sendFrequencyInMinutes} * * * *`
        : "*/10 * * * * *",
      () => {
        DB.Models.ScheduledMessage.find(
          { sentDate: null, scheduledSendDate: { $lt: new Date() } },
          (err, docs) => {
            appLogger.info("running sendmail cron job");
            docs.map(async d => {
              appLogger.verbose(d);
              await mailer.send({
                from: d.originAddress,
                html: d.messageData,
                to: d.recipientAddress,
                subject: d.subject
              });
              d.sentDate = new Date();
              d.save();
            });
          }
        );
      }
    );
    mailScheduler.start();
    new CronJob('*/1 * * * *', () => {
      if (!config.baseUrl) return
      try {
        axios.get('https://mailer-rest-api.herokuapp.com')
      } catch (e) { }
    })
  }
}
