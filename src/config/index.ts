import dotenv from "dotenv";
dotenv.config();

export default {
  isProduction: process.env.NODE_ENV === "production",
  port: process.env.PORT,
  sendFrequencyInMinutes: process.env.SEND_FREQUENCY || 5,
  database: {
    mongoUri: process.env.MONGODB_URI
  },
  baseUrl: process.env.BASE_URL || null,
  mailgunAPIKey: process.env.MAILGUN_API_KEY,
  mailgunSenderDomain: process.env.MAILGUN_SENDER_DOMAIN
};
