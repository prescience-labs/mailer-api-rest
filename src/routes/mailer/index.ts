import { Router } from "express";

const mailerRouter = Router();

mailerRouter.all("/schedule", (req, res) => {
  res.send("mail scheduled");
});

export default mailerRouter;
