const mongoose = require("mongoose");
const { env } = require("./env");
const { logger } = require("./logger");

mongoose.set("strictQuery", true);

let warnedAboutMissingDatabase = false;

async function connectDatabase() {
  if (!env.mongodbUri) {
    if (!warnedAboutMissingDatabase) {
      logger.warn(
        "MONGODB_URI is not configured. API will use seed content and skip database-backed features."
      );
      warnedAboutMissingDatabase = true;
    }

    return false;
  }

  if (mongoose.connection.readyState === 1) {
    return true;
  }

  try {
    await mongoose.connect(env.mongodbUri);
    logger.info("Connected to MongoDB.");
    return true;
  } catch (error) {
    logger.error({ err: error }, "Failed to connect to MongoDB. Falling back to seed content.");
    return false;
  }
}

function isDatabaseConnected() {
  return mongoose.connection.readyState === 1;
}

module.exports = {
  connectDatabase,
  isDatabaseConnected
};
