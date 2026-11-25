import jwt from "jsonwebtoken";
import { config } from "../config/env.js";

/** Creates a signed short-lived access token.
 * @param {{id: string, email: string}} user User identity.
 * @returns {string} Signed access token.
 * @throws {Error} If token signing fails.
 */
export function createAccessToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, config.accessTokenSecret, { expiresIn: "15m" });
}

/** Creates a signed refresh token.
 * @param {{id: string, email: string}} user User identity.
 * @returns {string} Signed refresh token.
 * @throws {Error} If token signing fails.
 */
export function createRefreshToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, config.refreshTokenSecret, { expiresIn: "7d" });
}

/** Verifies an access token.
 * @param {string} token Signed access token.
 * @returns {string | jwt.JwtPayload} Verified payload.
 * @throws {jwt.JsonWebTokenError} If the token is invalid or expired.
 */
export function verifyAccessToken(token) {
  return jwt.verify(token, config.accessTokenSecret);
}

/** Verifies a refresh token.
 * @param {string} token Signed refresh token.
 * @returns {string | jwt.JwtPayload} Verified payload.
 * @throws {jwt.JsonWebTokenError} If the token is invalid or expired.
 */
export function verifyRefreshToken(token) {
  return jwt.verify(token, config.refreshTokenSecret);
}
