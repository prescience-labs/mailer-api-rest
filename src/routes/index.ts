import { Router } from "express";
import mailerRouter from "./mailer";

const appRoutes = Router();

appRoutes.get("/", (req, res) => {
  res.json({ status: "ok" });
});

export default appRoutes;
