import { Dictionary, RequestHandler } from "express-serve-static-core";
import moment from "moment";
import { DB } from "../../db";
import { appLogger } from "../../log";

type RouteHandler = RequestHandler<Dictionary<string>>;

export class MailerController {
  public static handleScheduleMail: RouteHandler = async (req, res) => {
    let message = req.body;
    const { scheduledSendDate } = message;

    if (!scheduledSendDate) {
      message.scheduledSendDate = moment()
        .add(21, "days")
        .toDate();
    } else {
      message.scheduledSendDate = moment(scheduledSendDate).toDate();
    }
    try {
      message = await DB.Models.ScheduledMessage.create(message);
    } catch (e) {
      res.status(500);
      res.send(e);
    }
    appLogger.verbose(message);
    res.json(message);
  };
}
