import { Router } from "express";
import { DB } from "../../db";
import { IScheduledMessage } from "../../db/models/scheduledMessage";
import { appLogger } from "../../log";

/**
 * For quick tracker pixel reference, @see https://github.com/jaredpalmer/TIL/blob/master/Node.js/easy-tracking-pixel.md
 */

const mailerRouter = Router();

mailerRouter.post("/schedule", async (req, res) => {
  const message = await DB.Models.ScheduledMessage.create(req.body);
  res.send(message);
});

mailerRouter.get("/track/:id", (req, res) => {
  const { id: base64Id } = req.params;

  const decodedId = btoa(base64Id);
  // mark email of id as read
});

export default mailerRouter;
