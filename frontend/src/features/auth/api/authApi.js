import axios from "axios";

const client = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

/** Extracts a standard API error message.
 * @param {unknown} error Axios or request error.
 * @returns {string} Safe message for display.
 * @throws {never} Does not throw.
 */
export function getApiErrorMessage(error) {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? "We couldn't complete that request. Try again.";
  }
  return "We couldn't complete that request. Try again.";
}

/** Registers a new user.
 * @param {{name: string, email: string, password: string}} credentials Registration fields.
 * @returns {Promise<{user: object, accessToken: string}>} Authenticated response data.
 * @throws {Error} If the API rejects the request.
 */
export async function registerRequest(credentials) {
  const { data } = await client.post("/auth/register", credentials);
  return data.data;
}

/** Signs in an existing user.
 * @param {{email: string, password: string}} credentials Login fields.
 * @returns {Promise<{user: object, accessToken: string}>} Authenticated response data.
 * @throws {Error} If the API rejects the request.
 */
export async function loginRequest(credentials) {
  const { data } = await client.post("/auth/login", credentials);
  return data.data;
}

/** Exchanges the httpOnly refresh cookie for a new access token.
 * @returns {Promise<{accessToken: string}>} Refreshed access token.
 * @throws {Error} If refresh is rejected.
 */
export async function refreshRequest() {
  const { data } = await client.post("/auth/refresh");
  return data.data;
}

/** Retrieves the authenticated account.
 * @param {string} accessToken Bearer access token.
 * @returns {Promise<{user: object}>} Current account.
 * @throws {Error} If the API rejects the request.
 */
export async function meRequest(accessToken) {
  const { data } = await client.get("/auth/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data.data;
}

/** Signs out and invalidates the refresh cookie.
 * @returns {Promise<void>} Resolves after the API responds.
 * @throws {Error} If the API rejects the request.
 */
export async function logoutRequest() {
  await client.post("/auth/logout");
}
