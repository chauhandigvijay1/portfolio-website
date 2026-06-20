const { Resend } = require("resend");
const { env } = require("./env");
const { logger } = require("./logger");

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const resend = env.resendApiKey ? new Resend(env.resendApiKey) : null;

async function sendContactEmail(payload) {
  try {
    if (!resend) {
      logger.warn("Resend API key not configured. Contact email delivery was skipped.");
      return {
        delivered: false,
        skipped: true,
        reason: "missing_credentials"
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

    const { data, error } = await resend.emails.send({
      from: env.mailFrom || "onboarding@resend.dev",
      to: env.mailTo,
      reply_to: payload.email,
      subject,
      html,
      text
    });

    if (error) {
      logger.error({ err: error }, \`Resend API failed: \${error.message}\`);
      return {
        delivered: false,
        skipped: false,
        reason: "resend_api_error"
      };
    }

    logger.info({ messageId: data.id }, "Portfolio contact email delivered successfully via Resend.");

    return {
      delivered: true,
      skipped: false,
      messageId: data.id
    };
  } catch (error) {
    logger.error({ err: error }, \`Resend sendMail failed: \${error.message}\`);
    return {
      delivered: false,
      skipped: false,
      reason: "resend_exception"
    };
  }
}

module.exports = {
  sendContactEmail
};
