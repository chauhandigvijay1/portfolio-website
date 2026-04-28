const { logger } = require("../config/logger");

function notFoundMiddleware(request, response) {
  logger.warn({ method: request.method, path: request.path }, "Route not found");
  response.status(404).json({
    message: "Route not found."
  });
}

module.exports = { notFoundMiddleware };
