const express = require("express");
const { isDatabaseConnected } = require("../config/database");
const { contentRouter } = require("./content.routes");
const { contactRouter } = require("./contact.routes");
const { githubRouter } = require("./github.routes");
const { logger } = require("../config/logger");

const router = express.Router();

logger.info("Initializing API routes");

router.get("/health", (request, response) => {
  response.json({
    status: "ok",
    databaseConnected: isDatabaseConnected(),
    timestamp: new Date().toISOString()
  });
});

router.use((request, response, next) => {
  logger.info({ path: request.path }, "API router received request");
  next();
});

router.use("/content", contentRouter);
router.use("/contact", (request, response, next) => {
  logger.info({ method: request.method, path: request.path }, "Contact router middleware");
  next();
}, contactRouter);
router.use("/github", githubRouter);

logger.info("API routes initialized successfully");

module.exports = { apiRouter: router };
