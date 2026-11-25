import { AppError } from "../utils/AppError.js";
import { config } from "../config/env.js";

/** Converts application and dependency errors into the standard failure envelope.
 * @param {Error} error Error passed by Express.
 * @param {import("express").Request} req Incoming request.
 * @param {import("express").Response} res Express response.
 * @param {import("express").NextFunction} next Next middleware.
 * @returns {void} Sends a failure response.
 * @throws {Error} Forwards headers-sent errors to Express.
 */
export function errorMiddleware(error, req, res, next) {
  if (res.headersSent) return next(error);

  let statusCode = 500;
  let message = "Internal server error";
  let errors = [];

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    errors = error.errors;
  } else if (error?.code === 11000) {
    statusCode = 409;
    const field = Object.keys(error.keyValue ?? {})[0] ?? "email";
    message = "A user with this value already exists";
    errors = [{ field, message }];
  } else if (error?.name === "CastError") {
    statusCode = 400;
    message = "Invalid value";
    errors = [{ field: error.path ?? "id", message }];
  } else if (error?.name === "JsonWebTokenError" || error?.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Invalid or expired token";
  } else {
    console.error("Unhandled request error:", error);
  }

  const response = { success: false, message, errors };
  if (config.nodeEnv !== "production") response.stack = error.stack;
  return res.status(statusCode).json(response);
}
