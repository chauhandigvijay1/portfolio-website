const path = require("path");
const { isDatabaseConnected } = require("../config/database");
const { PortfolioContent } = require("../models/portfolio-content.model");

const portfolioSeed = require(path.resolve(
  __dirname,
  "..",
  "..",
  "..",
  "shared",
  "portfolio-content.json"
));

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

  if (!isDatabaseConnected()) {
    return portfolioSeed[key] || null;
  }

  const section = await PortfolioContent.findOne({ key }).lean();
  return section?.data || portfolioSeed[key] || null;
}

async function getPortfolioContent() {
  if (!isDatabaseConnected()) {
    return portfolioSeed;
  }

  const sections = await PortfolioContent.find({ key: { $in: sectionKeys } }).lean();
  const sectionMap = Object.fromEntries(sections.map((section) => [section.key, section.data]));

  return sectionKeys.reduce((accumulator, key) => {
    accumulator[key] = sectionMap[key] || portfolioSeed[key];
    return accumulator;
  }, {});
}

module.exports = {
  getPortfolioContent,
  getSection,
  portfolioSeed,
  sectionKeys
};
