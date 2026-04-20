const express = require("express");
const { isDatabaseConnected } = require("../config/database");
const { contentRouter } = require("./content.routes");
const { contactRouter } = require("./contact.routes");
const { githubRouter } = require("./github.routes");

const router = express.Router();

router.get("/health", (request, response) => {
  response.json({
    status: "ok",
    databaseConnected: isDatabaseConnected(),
    timestamp: new Date().toISOString()
  });
});

router.use("/content", contentRouter);
router.use("/contact", contactRouter);
router.use("/github", githubRouter);

module.exports = { apiRouter: router };
