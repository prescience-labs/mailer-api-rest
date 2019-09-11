import { Router } from "express";
import { DB } from "../../db";
import { IScheduledMessage } from "../../db/models/scheduledMessage";
import { appLogger } from "../../log";
import { MailerController } from "./controllers";

/**
 * For quick tracker pixel reference, @see https://github.com/jaredpalmer/TIL/blob/master/Node.js/easy-tracking-pixel.md
 */

const mailerRouter = Router();

mailerRouter.post("/schedule", MailerController.handleScheduleMail);

mailerRouter.get("/track/:id", (req, res) => {
  const { id: base64Id } = req.params;

  const decodedId = btoa(base64Id);
  // mark email of id as read
});

export default mailerRouter;
