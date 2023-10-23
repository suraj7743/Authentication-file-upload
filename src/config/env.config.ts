import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

export enum Environment {
  DEVELOPMENT = "DEVELOPMENT",
  PRODUCTION = "PRODUCTION",
  TEST = "TEST",
}

export default class EnvConfiguration {
  static PORT = process.env.PORT;
  static SERVER_HOST = process.env.SERVER_HOST;
  static NODE_ENV = process.env.NODE_ENV;
  static DB_NAME = process.env.DB_NAME;
  static DB_HOST = process.env.DB_HOST;
  static DB_PASSWORD = process.env.DB_PASSWORD;
  static DB_PORT = process.env.DB_PORT || 5432;
  static DB_USERNAME = process.env.DB_USERNAME;

  static FRONTEND_URL = process.env.FRONTEND_URL;
  static JWT_SECRET = process.env.JWT_SECRET || "apple";
  static JWT_TOKEN_EXPIRY = process.env.JWT_TOKEN_EXPIRY || "24h";

  // Mail

  static SMTP_HOST = process.env.SMTP_HOST;
  static SMTP_PORT = process.env.SMTP_PORT;
  static SMTP_USERNAME = process.env.SMTP_USERNAME;
  static SMTP_PASSWORD = process.env.SMTP_PASSWORD;
  static JWT_MAIL_SECRET = process.env.JWT_MAIL_SECRET || "";
  static JWT_MAIL_EXPIRY = process.env.JWT_MAIL_EXPIRY || "1h";
}
