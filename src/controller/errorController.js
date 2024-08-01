const httpStatus = require("http-status-code");
/**
 * Middleware to handle cases when no resources are found.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Next middleware function.
 */
exports.respondNoResourcesFound = (req, res, next) => {
  // Set the HTTP status code to 404 (Not Found).
  let errorCode = httpStatus.NOT_FOUND || 404;
  res.status(errorCode).send({ error: "Resource not found" });
};

/**
 * Middleware to handle internal server errors.
 * @param {Error} error - The error object.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Next middleware function.
 */
exports.respondInternalError = (error, req, res, next) => {
  // Set the HTTP status code to 500 (Internal Server Error).
  let errorCode = httpStatus.INTERNAL_SERVER_ERROR || 500;
  console.error(`ERROR occurred: ${error.stack}`);
  res.status(errorCode).send({ error: "Internal server error" });
};
