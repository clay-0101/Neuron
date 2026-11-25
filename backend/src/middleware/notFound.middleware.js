import { AppError } from "../utils/AppError.js";

/** Reports requests that do not match an API route.
 * @param {import("express").Request} req Incoming request.
 * @param {import("express").Response} res Express response.
 * @param {import("express").NextFunction} next Next middleware.
 * @returns {void} Forwards a 404 error.
 * @throws {AppError} Always.
 */
export function notFound(req, res, next) {
  next(new AppError(404, "Route not found"));
}
