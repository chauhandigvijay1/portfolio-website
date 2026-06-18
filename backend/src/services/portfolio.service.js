const fs = require("fs");
const path = require("path");
const { isDatabaseConnected } = require("../config/database");
const { PortfolioContent } = require("../models/portfolio-content.model");

const portfolioContentPath = path.resolve(
  __dirname,
  "..",
  "..",
  "..",
  "shared",
  "portfolio-content.json"
);

const sectionKeys = [
  "profile",
  "highlights",
  "timeline",
  "technologies",
  "projects",
  "certifications",
  "contact"
];

async function getSection(key) {
  if (!sectionKeys.includes(key)) {
    return null;
  }

  const portfolioSeed = readPortfolioSeed();

  if (!isDatabaseConnected()) {
    return portfolioSeed[key] || null;
  }

  const section = await PortfolioContent.findOne({ key }).lean();
  return portfolioSeed[key] ?? section?.data ?? null;
}

async function getPortfolioContent() {
  const portfolioSeed = readPortfolioSeed();

  if (!isDatabaseConnected()) {
    return portfolioSeed;
  }

  const sections = await PortfolioContent.find({ key: { $in: sectionKeys } }).lean();
  const sectionMap = Object.fromEntries(sections.map((section) => [section.key, section.data]));

  return sectionKeys.reduce((accumulator, key) => {
    accumulator[key] = portfolioSeed[key] ?? sectionMap[key] ?? null;
    return accumulator;
  }, {});
}

function readPortfolioSeed() {
  return JSON.parse(fs.readFileSync(portfolioContentPath, "utf8"));
}

module.exports = {
  getPortfolioContent,
  getSection,
  readPortfolioSeed,
  sectionKeys
};
