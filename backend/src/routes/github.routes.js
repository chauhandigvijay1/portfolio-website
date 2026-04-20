const express = require("express");
const { asyncHandler } = require("../utils/async-handler");
const { getGithubSummary } = require("../services/github.service");

const router = express.Router();

router.get(
  "/summary",
  asyncHandler(async (request, response) => {
    response.json(await getGithubSummary());
  })
);

module.exports = { githubRouter: router };
