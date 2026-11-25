import { validationResult } from "express-validator";
import { AppError } from "../utils/AppError.js";

/** Sends request validation failures to the centralized error handler.
 * @param {import("express").Request} req Incoming request.
 * @param {import("express").Response} res Express response.
 * @param {import("express").NextFunction} next Next middleware.
 * @returns {void} Calls `next`.
 * @throws {AppError} When request fields are invalid.
 */
export function validate(req, res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) return next();
  const errors = result.array().map((error) => ({
    field: error.path,
    message: error.msg,
  }));
  return next(new AppError(422, "Validation failed", errors));
}
