const express = require("express");
const { asyncHandler } = require("../utils/async-handler");
const { AppError } = require("../utils/app-error");
const { getPortfolioContent, getSection } = require("../services/portfolio.service");

const router = express.Router();

router.get(
  "/site",
  asyncHandler(async (request, response) => {
    const content = await getPortfolioContent();
    response.json(content);
  })
);

router.get(
  "/profile",
  asyncHandler(async (request, response) => {
    response.json(await getSection("profile"));
  })
);

router.get(
  "/highlights",
  asyncHandler(async (request, response) => {
    response.json(await getSection("highlights"));
  })
);

router.get(
  "/timeline",
  asyncHandler(async (request, response) => {
    response.json(await getSection("timeline"));
  })
);

router.get(
  "/projects",
  asyncHandler(async (request, response) => {
    response.json(await getSection("projects"));
  })
);

router.get(
  "/technologies",
  asyncHandler(async (request, response) => {
    response.json(await getSection("technologies"));
  })
);

router.get(
  "/certifications",
  asyncHandler(async (request, response) => {
    response.json(await getSection("certifications"));
  })
);

router.get(
  "/contact",
  asyncHandler(async (request, response) => {
    response.json(await getSection("contact"));
  })
);

router.get(
  "/projects/:slug",
  asyncHandler(async (request, response) => {
    const projects = (await getSection("projects")) || [];
    const project = projects.find((item) => item.slug === request.params.slug);

    if (!project) {
      throw new AppError("Project not found.", 404);
    }

    response.json(project);
  })
);

router.get(
  "/technologies/:slug",
  asyncHandler(async (request, response) => {
    const technologies = (await getSection("technologies")) || [];
    const technology = technologies.find((item) => item.slug === request.params.slug);

    if (!technology) {
      throw new AppError("Technology not found.", 404);
    }

    response.json(technology);
  })
);

module.exports = { contentRouter: router };
