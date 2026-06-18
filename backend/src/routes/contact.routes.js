const express = require("express");
const { z } = require("zod");
const { validate } = require("../middleware/validate");
const { asyncHandler } = require("../utils/async-handler");
const { submitContactMessage } = require("../services/contact.service");
const { logger } = require("../config/logger");

const router = express.Router();

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  company: z.string().trim().max(120).optional().default(""),
  subject: z.string().trim().min(3).max(140),
  message: z.string().trim().min(20).max(2000)
});

router.post(
  "/",
  (request, response, next) => {
    logger.info({ method: request.method, path: request.path }, "Contact POST route matched");
    next();
  },
  validate(contactSchema),
  asyncHandler(async (request, response) => {
    logger.info("Contact form handler started");
    const result = await submitContactMessage(request.body, {
      userAgent: request.get("user-agent"),
      source: "portfolio-contact-form"
    });

    const isSkipped = !!result?.delivery?.skipped;
    const isDelivered = !!result?.delivery?.delivered;

    logger.info(
      { 
        stored: result.stored, 
        delivered: isDelivered, 
        skipped: isSkipped,
        reason: result?.delivery?.reason 
      }, 
      "Contact message processed"
    );

    // If email delivery was skipped due to missing credentials, return disabled message.
    // If it was a network/SMTP connection failure, return the standard success message.
    response.status(201).json({
      message: isSkipped
        ? "Message received. Email delivery is currently disabled in this environment."
        : "Message received. I will get back to you soon.",
      stored: result.stored,
      delivered: isDelivered
    });
  })
);

module.exports = { contactRouter: router };
