const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const parseNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: parseNumber(process.env.PORT, 5000),
  clientOrigins: (process.env.CLIENT_ORIGIN || "http://localhost:3000")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean),
  mongodbUri: process.env.MONGODB_URI || "",
  smtpHost: process.env.SMTP_HOST || "",
  smtpPort: parseNumber(process.env.SMTP_PORT, 587),
  smtpSecure: process.env.SMTP_SECURE === "true",
  smtpUser: process.env.SMTP_USER || "",
  smtpPass: process.env.SMTP_PASS || "",
  mailFrom: process.env.MAIL_FROM || process.env.SMTP_USER || "",
  mailTo: process.env.MAIL_TO || "chauhandigvijay669@gmail.com",
  githubUsername: process.env.GITHUB_USERNAME || "chauhandigvijay1",
  githubToken: process.env.GITHUB_TOKEN || "",
  rateLimitWindowMs: parseNumber(process.env.RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000),
  rateLimitMax: parseNumber(process.env.RATE_LIMIT_MAX, 100),
  contactRateLimitMax: parseNumber(process.env.CONTACT_RATE_LIMIT_MAX, 5)
};

module.exports = { env };
