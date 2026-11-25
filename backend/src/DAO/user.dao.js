import { UserModel } from "../models/user.model.js";

/** Creates and persists a user.
 * @param {{name: string, email: string, password: string}} input User fields.
 * @returns {Promise<import("mongoose").HydratedDocument<unknown>>} The new user.
 * @throws {Error} If persistence fails.
 */
export async function createUser(input) {
  return UserModel.create(input);
}

/** Finds a user by normalized email and includes auth-only fields.
 * @param {string} email Email address.
 * @returns {Promise<import("mongoose").HydratedDocument<unknown>|null>} Matching user, if any.
 * @throws {Error} If the database query fails.
 */
export async function findUserByEmail(email) {
  return UserModel.findOne({ email: email.toLowerCase() }).select("+password +refreshToken");
}

/** Finds a user by id without secret fields.
 * @param {string} id User identifier.
 * @returns {Promise<import("mongoose").HydratedDocument<unknown>|null>} Matching user, if any.
 * @throws {Error} If the database query fails.
 */
export async function findUserById(id) {
  return UserModel.findById(id);
}

/** Finds a user by id and includes the stored refresh token.
 * @param {string} id User identifier.
 * @returns {Promise<import("mongoose").HydratedDocument<unknown>|null>} Matching user, if any.
 * @throws {Error} If the database query fails.
 */
export async function findUserByIdWithRefreshToken(id) {
  return UserModel.findById(id).select("+refreshToken");
}

/** Persists the active refresh token for a user.
 * @param {string} id User identifier.
 * @param {string} refreshToken New refresh token.
 * @returns {Promise<import("mongoose").HydratedDocument<unknown>|null>} Updated user, if any.
 * @throws {Error} If the database update fails.
 */
export async function updateRefreshToken(id, refreshToken) {
  return UserModel.findByIdAndUpdate(id, { refreshToken }, { new: true });
}

/** Clears a refresh token only when it matches the supplied token.
 * @param {string} id User identifier.
 * @param {string} refreshToken The token to invalidate.
 * @returns {Promise<import("mongoose").HydratedDocument<unknown>|null>} Updated user, if any.
 * @throws {Error} If the database update fails.
 */
export async function clearRefreshToken(id, refreshToken) {
  return UserModel.findOneAndUpdate(
    { _id: id, refreshToken },
    { $set: { refreshToken: null } },
    { new: true },
  ).select("+refreshToken");
}
