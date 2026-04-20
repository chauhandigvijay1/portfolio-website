const pino = require("pino");
const { env } = require("./env");

const transport =
  env.nodeEnv === "development"
    ? pino.transport({
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname"
        }
      })
    : undefined;

const logger = pino(
  {
    level: process.env.LOG_LEVEL || (env.nodeEnv === "development" ? "debug" : "info"),
    base: undefined
  },
  transport
);

module.exports = { logger };
