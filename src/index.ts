import dotenv from "dotenv";
import express from "express";
import config from "./config";
import logger from "./log";
dotenv.config();

const app = express();

app.use(logger);

app.get("/", (req, res, next) => {
  res.json({ status: "ok" });
});

app.listen(config.port || 3000, () => {
  console.log(`Listening on port ${config.port || 3000} 🚀`);
});
