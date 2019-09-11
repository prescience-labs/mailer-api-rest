import { Document, Model, Schema, model } from "mongoose";

export interface IScheduledMessage extends Document {
  messageData: string;
  recipientAddress: string;
  originAddress: string;
  sentDate?: Date;
}

export interface ScheduledMessageModel extends Model<IScheduledMessage> {}

export class ScheduledMessage {
  private _model: Model<IScheduledMessage>;
  constructor() {
    const schema: Schema = new Schema(
      {
        messageData: { type: String, required: true },
        originAddress: { type: String, required: true },
        recipientAddress: { type: String, required: true },
        sentDate: Date
      },
      { timestamps: true }
    );
    this._model = model<IScheduledMessage>("ScheduledMessage", schema);
  }
  public get model(): Model<IScheduledMessage> {
    return this._model;
  }
}
