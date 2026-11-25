/**
 * Creates a typed-by-convention success response envelope.
 * @param {string} message Human-readable success message.
 * @param {*} data Response payload.
 * @returns {{success: true, message: string, data: *}} The response envelope.
 */
export function successEnvelope(message, data) {
  return { success: true, message, data };
}
