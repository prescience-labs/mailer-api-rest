import winston from "winston";
import config from "../config";
import { Request, Response } from "express";

export const logger = winston.createLogger({
  format: winston.format.cli(),
  transports: config.isDev
    ? new winston.transports.Console()
    : [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "app.log" })
      ]
});

export default function logMiddleware(
  req: Request,
  res: Response,
  next: () => void
) {
  const logString = `${res.statusCode} ${req.method} ${req.path} ${
    req.protocol
  }`;
  const { statusCode } = res;
  if (statusCode >= 200 && statusCode < 300) {
    logger.info(logString);
  } else {
    logger.error(logString);
  }
  next();
}
