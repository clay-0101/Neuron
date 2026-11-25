/** Forwards an asynchronous route-handler rejection to Express error middleware.
 * @param {import("express").RequestHandler} handler Express handler.
 * @returns {import("express").RequestHandler} Wrapped handler.
 * @throws {Error} Rejected handler errors are forwarded to `next`.
 */
export function asyncHandler(handler) {
  return function wrappedHandler(req, res, next) {
    Promise.resolve()
      .then(() => handler(req, res, next))
      .catch(next);
  };
}
