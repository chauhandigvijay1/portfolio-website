const { connectDatabase, isDatabaseConnected } = require("../config/database");
const { logger } = require("../config/logger");
const { PortfolioContent } = require("../models/portfolio-content.model");
const { portfolioSeed, sectionKeys } = require("../services/portfolio.service");

async function seedContent() {
  await connectDatabase();

  if (!isDatabaseConnected()) {
    logger.error("Database connection is required to seed portfolio content.");
    process.exit(1);
  }

  for (const key of sectionKeys) {
    await PortfolioContent.findOneAndUpdate(
      { key },
      {
        key,
        data: portfolioSeed[key]
      },
      {
        upsert: true,
        new: true
      }
    );
  }

  logger.info("Portfolio content seeded successfully.");
  process.exit(0);
}

seedContent().catch((error) => {
  logger.error({ err: error }, "Portfolio content seeding failed.");
  process.exit(1);
});
