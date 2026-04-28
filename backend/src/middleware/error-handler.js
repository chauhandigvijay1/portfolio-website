const { ZodError } = require("zod");
const { AppError } = require("../utils/app-error");
const { logger } = require("../config/logger");

function errorHandler(error, request, response, next) {
  logger.error({ err: error, path: request.path, method: request.method }, "Error in handler");

  if (response.headersSent) {
    return next(error);
  }

  if (error instanceof ZodError) {
    return response.status(400).json({
      message: "Validation failed.",
      issues: error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message
      }))
    });
  }

  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      message: error.message
    });
  }

  return response.status(500).json({
    message: "Internal server error."
  });
}

module.exports = { errorHandler };
