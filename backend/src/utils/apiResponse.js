import { successEnvelope } from "../types/api.js";

/** Sends the shared success response envelope.
 * @param {import("express").Response} res Express response.
 * @param {number} statusCode HTTP status.
 * @param {string} message Success message.
 * @param {*} data Payload; use an empty object or null when no payload is needed.
 * @returns {import("express").Response} Sent response.
 * @throws {Error} If the response cannot be written.
 */
export function sendSuccess(res, statusCode, message, data) {
  return res.status(statusCode).json(successEnvelope(message, data ?? {}));
}
