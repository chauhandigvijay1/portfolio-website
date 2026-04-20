const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const pinoHttp = require("pino-http");
const { env } = require("./config/env");
const { logger } = require("./config/logger");
const { apiRouter } = require("./routes");
const { errorHandler } = require("./middleware/error-handler");
const { notFoundMiddleware } = require("./middleware/not-found");

const app = express();

app.set("trust proxy", 1);

app.use(
  pinoHttp({
    logger
  })
);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || env.clientOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS origin not allowed."));
    }
  })
);

app.use(
  helmet({
    contentSecurityPolicy: false
  })
);

app.use(
  rateLimit({
    windowMs: env.rateLimitWindowMs,
    max: env.rateLimitMax,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    handler(request, response) {
      response.status(429).json({
        message: "Too many requests. Please try again later."
      });
    }
  })
);

app.use(express.json({ limit: "1mb" }));

app.use(
  "/api/contact",
  rateLimit({
    windowMs: env.rateLimitWindowMs,
    max: env.contactRateLimitMax,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    handler(request, response) {
      response.status(429).json({
        message: "Too many contact requests. Please wait before trying again."
      });
    }
  })
);

app.use("/api", apiRouter);
app.use(notFoundMiddleware);
app.use(errorHandler);

module.exports = { app };
