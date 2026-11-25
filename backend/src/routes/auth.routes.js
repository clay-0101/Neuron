import { Router } from "express";
import { login, logout, me, refresh, register } from "../controller/auth.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { loginValidator, registerValidator } from "../validators/auth.validator.js";

const router = Router();

/** Registers authentication endpoints and their validation/authentication handlers.
 * @returns {Router} Authentication router.
 * @throws {Error} If route definitions are invalid.
 */
router.post("/register", registerValidator, validate, asyncHandler(register));
router.post("/login", loginValidator, validate, asyncHandler(login));
router.post("/refresh", asyncHandler(refresh));
router.post("/logout", asyncHandler(logout));
router.get("/me", requireAuth, asyncHandler(me));

export default router;
