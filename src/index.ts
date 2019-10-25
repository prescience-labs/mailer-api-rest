import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import config from "./config";
import { appLogger, logMiddleware } from "./log";
import appRoutes from "./routes";
import { CronScheduler } from "./services/cron";
import cors from 'cors'
const app = express();

app.use(logMiddleware);
app.use(cors({ origin: '*' }))
app.use(bodyParser());

app.use("/", appRoutes);

app.listen(config.port || 3000, () => {
  CronScheduler.init();
  appLogger.info(`Listening on port ${config.port || 3000} 🚀`);
});
