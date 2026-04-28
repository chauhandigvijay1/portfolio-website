const nodemailer = require("nodemailer");
const { env } = require("./env");
const { logger } = require("./logger");

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

async function createTransporter() {
  if (!env.smtpHost || !env.smtpUser || !env.smtpPass) {
    logger.info("SMTP credentials not configured, email delivery will be skipped");
    return null;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: env.smtpHost,
      port: env.smtpPort,
      secure: env.smtpSecure,
      auth: {
        user: env.smtpUser,
        pass: env.smtpPass
      }
    });

    await transporter.verify();
    logger.info("SMTP transporter verified successfully");
    return transporter;
  } catch (error) {
    logger.error({ err: error }, "Failed to create/verify SMTP transporter");
    return null;
  }
}

async function sendContactEmail(payload) {
  try {
    const transporter = await createTransporter();

    if (!transporter) {
      logger.warn(
        { email: payload.email },
        "SMTP credentials are missing. Contact email delivery was skipped."
      );

      return {
        delivered: false,
        skipped: true
      };
    }

    const subject = `[Portfolio] ${payload.subject}`;
    const html = `
    <div style="font-family: Inter, Arial, sans-serif; line-height: 1.6; color: #111827;">
      <h2 style="margin-bottom: 16px;">New portfolio inquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Company:</strong> ${escapeHtml(payload.company || "Not provided")}</p>
      <p><strong>Subject:</strong> ${escapeHtml(payload.subject)}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${escapeHtml(payload.message)}</p>
    </div>
  `;

    const text = [
      "New portfolio inquiry",
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Company: ${payload.company || "Not provided"}`,
      `Subject: ${payload.subject}`,
      "Message:",
      payload.message
    ].join("\n");

    const info = await transporter.sendMail({
      from: env.mailFrom || env.smtpUser,
      to: env.mailTo,
      replyTo: payload.email,
      subject,
      html,
      text
    });

    logger.info({ messageId: info.messageId }, "Portfolio contact email delivered.");

    return {
      delivered: true,
      skipped: false,
      messageId: info.messageId
    };
  } catch (error) {
    logger.error({ err: error }, "Failed to send contact email");
    return {
      delivered: false,
      skipped: false
    };
  }
}

module.exports = {
  sendContactEmail
};
