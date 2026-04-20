const express = require("express");
const { z } = require("zod");
const { validate } = require("../middleware/validate");
const { asyncHandler } = require("../utils/async-handler");
const { submitContactMessage } = require("../services/contact.service");

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
  validate(contactSchema),
  asyncHandler(async (request, response) => {
    const result = await submitContactMessage(request.body, {
      userAgent: request.get("user-agent"),
      source: "portfolio-contact-form"
    });

    response.status(201).json({
      message: result.delivery.skipped
        ? "Message received. Email delivery is currently disabled in this environment."
        : "Message received. I will get back to you soon.",
      stored: result.stored,
      delivered: result.delivery.delivered
    });
  })
);

module.exports = { contactRouter: router };
