const nodemailer = require("nodemailer");
const dns = require("dns").promises;
const { env } = require("./env");
const { logger } = require("./logger");

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const smtpTimeout = 10000;

function getMissingSmtpCredentials() {
  return [
    ["SMTP_HOST", env.smtpHost],
    ["SMTP_USER", env.smtpUser],
    ["SMTP_PASS", env.smtpPass]
  ]
    .filter(([, value]) => !value)
    .map(([name]) => name);
}

function classifySmtpError(error) {
  const code = error?.code || "UNKNOWN";
  const command = error?.command || "NONE";
  const message = error?.message || "";

  if (code === "EAUTH" || command === "AUTH" || /auth|invalid login|username and password/i.test(message)) {
    return {
      reason: "authentication_failed",
      logMessage: `SMTP authentication failed (code: ${code}, command: ${command}, msg: ${message}).`
    };
  }

  if (
    code === "ETIMEDOUT" ||
    code === "ESOCKET" ||
    code === "ECONNREFUSED" ||
    code === "ENETUNREACH" ||
    /timeout|timed out|greeting never received/i.test(message) ||
    /ipv6|family 6|::/i.test(message) ||
    /socket|refused|unreachable/i.test(message)
  ) {
    return {
      reason: `smtp_connection_failed_${code.toLowerCase()}`,
      logMessage: `SMTP connection/network failure (code: ${code}, command: ${command}, msg: ${message}).`
    };
  }

  return {
    reason: `smtp_failed_${code.toLowerCase()}`,
    logMessage: `SMTP error (code: ${code}, command: ${command}, msg: ${message}).`
  };
}

async function createTransporter() {
  const missingCredentials = getMissingSmtpCredentials();

  if (missingCredentials.length > 0) {
    logger.warn({ missingCredentials }, "SMTP credentials not configured. Contact email delivery was skipped.");
    return {
      transporter: null,
      delivery: {
        delivered: false,
        skipped: true,
        reason: "missing_credentials"
      }
    };
  }

  // Resolve SMTP Host to IPv4 manually using dns.resolve4
  let targetHost = env.smtpHost;
  try {
    logger.info({ host: env.smtpHost }, `Manually resolving SMTP host ${env.smtpHost} using dns.resolve4()`);
    const addresses = await dns.resolve4(env.smtpHost);
    if (addresses && addresses.length > 0) {
      targetHost = addresses[0];
      logger.info({ originalHost: env.smtpHost, resolvedIp: targetHost }, `Successfully resolved SMTP host to IPv4 address`);
    } else {
      logger.warn({ host: env.smtpHost }, `dns.resolve4 returned no addresses. Using host directly.`);
    }
  } catch (error) {
    logger.error({ err: error, host: env.smtpHost }, `dns.resolve4 failed. Using host directly.`);
  }

  logger.info(
    {
      smtpHost: targetHost,
      originalHost: env.smtpHost,
      smtpPort: env.smtpPort,
      smtpSecure: env.smtpSecure,
      smtpUser: env.smtpUser
    },
    "Creating SMTP transporter with resolved IPv4 host..."
  );

  const transporter = nodemailer.createTransport({
    host: targetHost,
    port: env.smtpPort,
    secure: env.smtpSecure,
    family: 4, // Force IPv4 connection only
    tls: {
      servername: env.smtpHost || "smtp.gmail.com"
    },
    connectionTimeout: smtpTimeout,
    greetingTimeout: smtpTimeout,
    socketTimeout: smtpTimeout,
    auth: {
      user: env.smtpUser,
      pass: env.smtpPass
    }
  });

  try {
    await transporter.verify();
    logger.info("SMTP transporter verified successfully");
  } catch (error) {
    const smtpError = classifySmtpError(error);
    logger.error(
      { err: error, reason: smtpError.reason },
      `SMTP transporter verification failed, but proceeding anyway: ${smtpError.logMessage}`
    );
  }

  return {
    transporter,
    delivery: {
      delivered: false,
      skipped: false
    }
  };
}

async function sendContactEmail(payload) {
  try {
    const { transporter, delivery } = await createTransporter();

    if (!transporter) {
      return delivery;
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

    logger.info({ messageId: info.messageId }, "Portfolio contact email delivered successfully.");

    return {
      delivered: true,
      skipped: false,
      messageId: info.messageId
    };
  } catch (error) {
    const smtpError = classifySmtpError(error);
    logger.error(
      { err: error, reason: smtpError.reason },
      `SMTP sendMail failed: ${smtpError.logMessage}`
    );
    return {
      delivered: false,
      skipped: false,
      reason: smtpError.reason
    };
  }
}

module.exports = {
  sendContactEmail
};
