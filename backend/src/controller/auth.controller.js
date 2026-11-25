import jwt from "jsonwebtoken";
import {
  clearRefreshToken,
  createUser,
  findUserByEmail,
  findUserById,
  findUserByIdWithRefreshToken,
  updateRefreshToken,
} from "../DAO/user.dao.js";
import { config } from "../config/env.js";
import { AppError } from "../utils/AppError.js";
import { sendSuccess } from "../utils/apiResponse.js";
import { createAccessToken, createRefreshToken, verifyRefreshToken } from "../utils/jwt.js";

const COOKIE_NAME = "neuron_refresh";
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: config.nodeEnv === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/api/v1/auth",
};

function publicUser(user) {
  return { id: String(user._id), name: user.name, email: user.email };
}

function issueTokens(user) {
  const identity = { id: String(user._id), email: user.email };
  return { accessToken: createAccessToken(identity), refreshToken: createRefreshToken(identity) };
}

/** Registers a user and creates an authenticated session.
 * @param {import("express").Request} req Request containing name, email and password.
 * @param {import("express").Response} res Express response.
 * @returns {Promise<import("express").Response>} Created account response.
 * @throws {AppError} If email is already in use.
 */
export async function register(req, res) {
  const { name, email, password } = req.body;
  const existingUser = await findUserByEmail(email);
  if (existingUser) throw new AppError(409, "An account with this email already exists", [
    { field: "email", message: "Email is already registered" },
  ]);
  const user = await createUser({ name, email, password });
  const tokens = issueTokens(user);
  await updateRefreshToken(user._id, tokens.refreshToken);
  res.cookie(COOKIE_NAME, tokens.refreshToken, COOKIE_OPTIONS);
  return sendSuccess(res, 201, "Account created successfully", {
    user: publicUser(user),
    accessToken: tokens.accessToken,
  });
}

/** Verifies credentials and creates an authenticated session.
 * @param {import("express").Request} req Request containing email and password.
 * @param {import("express").Response} res Express response.
 * @returns {Promise<import("express").Response>} Login response.
 * @throws {AppError} With the same message for unknown users and wrong passwords.
 */
export async function login(req, res) {
  const user = await findUserByEmail(req.body.email);
  if (!user || !(await user.comparePassword(req.body.password))) {
    throw new AppError(401, "Invalid credentials");
  }
  const tokens = issueTokens(user);
  await updateRefreshToken(user._id, tokens.refreshToken);
  res.cookie(COOKIE_NAME, tokens.refreshToken, COOKIE_OPTIONS);
  return sendSuccess(res, 200, "Login successful", {
    user: publicUser(user),
    accessToken: tokens.accessToken,
  });
}

/** Verifies and rotates the persisted refresh-token pair.
 * @param {import("express").Request} req Request containing the refresh cookie.
 * @param {import("express").Response} res Express response.
 * @returns {Promise<import("express").Response>} Rotated token response.
 * @throws {AppError} If the refresh token is missing or does not match stored state.
 */
export async function refresh(req, res) {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) throw new AppError(401, "Invalid refresh token");
  const payload = verifyRefreshToken(token);
  if (typeof payload === "string" || typeof payload.id !== "string") {
    throw new AppError(401, "Invalid refresh token");
  }
  const user = await findUserByIdWithRefreshToken(payload.id);
  if (!user || user.refreshToken !== token) throw new AppError(401, "Invalid refresh token");
  const tokens = issueTokens(user);
  await updateRefreshToken(user._id, tokens.refreshToken);
  res.cookie(COOKIE_NAME, tokens.refreshToken, COOKIE_OPTIONS);
  return sendSuccess(res, 200, "Session refreshed", { accessToken: tokens.accessToken });
}

/** Invalidates the refresh token and clears its cookie.
 * @param {import("express").Request} req Request containing the refresh cookie.
 * @param {import("express").Response} res Express response.
 * @returns {Promise<import("express").Response>} Logout response.
 * @throws {Error} If the database operation fails.
 */
export async function logout(req, res) {
  const token = req.cookies?.[COOKIE_NAME];
  if (token) {
    const payload = jwt.decode(token);
    if (payload && typeof payload !== "string" && typeof payload.id === "string") {
      await clearRefreshToken(payload.id, token);
    }
  }
  res.clearCookie(COOKIE_NAME, { ...COOKIE_OPTIONS, maxAge: undefined });
  return sendSuccess(res, 200, "Logout successful", {});
}

/** Returns the currently authenticated public user.
 * @param {import("express").Request} req Authenticated request.
 * @param {import("express").Response} res Express response.
 * @returns {import("express").Response} Current user response.
 * @throws {AppError} If no authenticated user is attached.
 */
export function me(req, res) {
  if (!req.user) throw new AppError(401, "Authentication required");
  return sendSuccess(res, 200, "Current user retrieved", { user: publicUser(req.user) });
}
