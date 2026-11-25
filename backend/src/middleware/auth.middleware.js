import { AppError } from "../utils/AppError.js";
import { verifyAccessToken } from "../utils/jwt.js";
import { findUserById } from "../DAO/user.dao.js";

/** Authenticates a bearer access token and attaches its user to the request.
 * @param {import("express").Request} req Incoming request.
 * @param {import("express").Response} res Express response.
 * @param {import("express").NextFunction} next Next middleware.
 * @returns {Promise<void>} Resolves after authentication.
 * @throws {AppError} When credentials are missing or the account no longer exists.
 */
export async function requireAuth(req, res, next) {
  try {
    const authorization = req.get("authorization");
    if (!authorization?.startsWith("Bearer ")) {
      throw new AppError(401, "Authentication required");
    }
    const payload = verifyAccessToken(authorization.slice(7));
    if (typeof payload === "string" || typeof payload.id !== "string") {
      throw new AppError(401, "Invalid or expired token");
    }
    const user = await findUserById(payload.id);
    if (!user) throw new AppError(401, "Authentication required");
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}
