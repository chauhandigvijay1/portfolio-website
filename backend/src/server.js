const { connectDatabase } = require("./config/database");
const { env } = require("./config/env");
const { logger } = require("./config/logger");
const { app } = require("./app");

async function startServer() {
  await connectDatabase();

  app.listen(env.port, () => {
    logger.info(`Portfolio backend listening on port ${env.port}.`);
  });
}

startServer().catch((error) => {
  logger.error({ err: error }, "Failed to start backend server.");
  process.exit(1);
});
