const { isDatabaseConnected } = require("../config/database");
const { sendContactEmail } = require("../config/mailer");
const { ContactMessage } = require("../models/contact-message.model");

async function submitContactMessage(payload, metadata = {}) {
  let stored = false;

  if (isDatabaseConnected()) {
    await ContactMessage.create({
      ...payload,
      userAgent: metadata.userAgent || "",
      source: metadata.source || "portfolio-contact-form"
    });
    stored = true;
  }

  const delivery = await sendContactEmail(payload);

  return {
    stored,
    delivery
  };
}

module.exports = {
  submitContactMessage
};
