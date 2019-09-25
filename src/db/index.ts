import { connect, connection, Connection } from "mongoose";
import { appLogger } from "../log";
import config from "../config";
import {
  ScheduledMessage,
  ScheduledMessageModel
} from "./models/scheduledMessage";

declare interface IModels {
  ScheduledMessage: ScheduledMessageModel;
}

export class DB {
  private static instance: DB;

  private _db: Connection;
  private _models: IModels;

  private constructor() {
    connect(
      config.database.mongoUri,
      {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true
      }
    );
    this._db = connection;
    this._db.on("open", this.connected);
    this._db.on("error", this.error);
    this._db.on("close", this.close);

    this._models = {
      // initialize all models
      ScheduledMessage: new ScheduledMessage().model
    };
  }

  public static get Models() {
    if (!DB.instance) {
      DB.instance = new DB();
    }
    return DB.instance._models;
  }

  private connected() {
    appLogger.info("Mongo has connected");
  }

  private error(err: any) {
    appLogger.error("Mongo has errored", err);
  }

  private close() {
    appLogger.info("Mongo has disconnected");
  }
}
