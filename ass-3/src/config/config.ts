export const CONFIGS = {
  port: Number(process.env["PORT"]) || 9000,
  mongoUri: process.env["MONGO_URI"] || "/",
  smtpUser: process.env["SMTP_USER"] || "test.team",
  smtpPass: process.env["SMTP_PASSWORD"] || "1234",
  smtpHost: process.env["SMTP_HOST"] || "gmail",
  smtpPort: Number(process.env["SMTP_PORT"]) || 587,
  jwtSecret: process.env["JWT_SECRET"] || "somesecret",
  emailFrom: process.env["EMAIL_FROM"] || "EventBoss",
};
