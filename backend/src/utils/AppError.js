/** Represents an expected HTTP error.
 * @param {number} statusCode HTTP status code.
 * @param {string} message Safe message for the client.
 * @param {Array<{field: string, message: string}>} errors Optional field errors.
 * @param {boolean} isOperational Whether this error is expected.
 * @returns {AppError} An application error.
 */
export class AppError extends Error {
  constructor(statusCode, message, errors = [], isOperational = true) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = isOperational;
    Error.captureStackTrace?.(this, AppError);
  }
}
