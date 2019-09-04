import dotenv from "dotenv";
import express from "express";
import config from "./config";
import { appLogger, logMiddleware } from "./log";
import appRoutes from "./routes";
dotenv.config();

const app = express();

app.use(logMiddleware);

app.use("/", appRoutes);

app.listen(config.port || 3000, () => {
  appLogger.info(`Listening on port ${config.port || 3000} 🚀`);
});
