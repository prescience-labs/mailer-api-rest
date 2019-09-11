import { Router } from "express";
import mailerRouter from "./mailer/routes";

const appRoutes = Router();

appRoutes.get("/", (req, res) => {
  res.json({ status: "ok" });
});

appRoutes.use("/mailer", mailerRouter);

export default appRoutes;
