import { Request, Response } from "express";
import winston from "winston";
import config from "../config";

export const appLogger = winston.createLogger({
  format: winston.format.cli(),
  transports: config.isProduction
    ? [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "app.log" })
      ]
    : new winston.transports.Console()
});

export function logMiddleware(req: Request, res: Response, next: () => void) {
  const logString = `${res.statusCode} ${req.method} ${req.path} ${
    req.protocol
  }`;
  const { statusCode } = res;
  if (statusCode >= 200 && statusCode < 300) {
    appLogger.info(logString);
  } else {
    appLogger.error(logString);
  }
  next();
}
