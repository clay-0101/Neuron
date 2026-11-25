# Neuron

Neuron is a minimal full-stack authentication starter for an AI chat workspace. It includes a JavaScript Express/MongoDB API and a React/Vite client with Redux Toolkit, Axios, Tailwind CSS, rotating refresh cookies, and a Vite development proxy.

## Requirements

- Node.js 20+
- MongoDB (local or hosted)

## Run locally

1. Copy `backend/.env.example` to `backend/.env` and set unique, random access and refresh secrets.
2. Install backend dependencies and start the API:

   ```sh
   cd backend
   npm install
   npm run dev
   ```

3. In another terminal, install frontend dependencies and start Vite:

   ```sh
   cd frontend
   npm install
   npm run dev
   ```

Vite proxies `/api` requests to `http://localhost:5000`; no CORS configuration is needed. The API listens on port `5000` by default.

## Authentication API

All routes are prefixed with `/api/v1/auth`. Success responses use `{ "success": true, "message": "...", "data": {} }`; failures use `{ "success": false, "message": "...", "errors": [] }`. The refresh token is held only in an httpOnly cookie; access tokens are returned in `data`.

### `POST /register`

Request:

```json
{ "name": "Ada Lovelace", "email": "ada@example.com", "password": "Analytical123" }
```

Response (`201`):

```json
{
  "success": true,
  "message": "Account created successfully",
  "data": {
    "user": { "id": "USER_ID", "name": "Ada Lovelace", "email": "ada@example.com" },
    "accessToken": "ACCESS_TOKEN"
  }
}
```

### `POST /login`

Request:

```json
{ "email": "ada@example.com", "password": "Analytical123" }
```

Response (`200`): same data shape as registration, with the message `"Login successful"`.

### `POST /refresh`

Send the httpOnly `neuron_refresh` cookie. The response rotates that cookie and returns:

```json
{ "success": true, "message": "Session refreshed", "data": { "accessToken": "ACCESS_TOKEN" } }
```

### `POST /logout`

Send the refresh cookie to invalidate the session. Response:

```json
{ "success": true, "message": "Logout successful", "data": {} }
```

### `GET /me`

Send `Authorization: Bearer ACCESS_TOKEN`. Response:

```json
{
  "success": true,
  "message": "Current user retrieved",
  "data": { "user": { "id": "USER_ID", "name": "Ada Lovelace", "email": "ada@example.com" } }
}
```

## Frontend layers

The authentication feature uses four layers in `frontend/src/features/auth/`: `hooks/` for UI state and API orchestration, `ui/` for pages/components, `state/` for Redux Toolkit, and `api/` for Axios requests.
