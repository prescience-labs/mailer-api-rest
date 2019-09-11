import dotenv from "dotenv";
dotenv.config();

export default {
  isProduction: process.env.NODE_ENV === "production",
  port: process.env.PORT,
  sendFrequencyInMinutes: process.env.SEND_FREQUENCY || 5,
  database: {
    mongoUri: process.env.MONGODB_URI
  }
};
