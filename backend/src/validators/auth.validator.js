import { body } from "express-validator";

/** Validates registration fields.
 * @returns {import("express-validator").ValidationChain[]} Registration validation chains.
 * @throws {Error} Validation errors are surfaced by `validate`.
 */
export const registerValidator = [
  body("name").trim().notEmpty().withMessage("Name is required").bail()
    .isLength({ min: 2, max: 50 }).withMessage("Name must be between 2 and 50 characters"),
  body("email").trim().isEmail().withMessage("Enter a valid email address").normalizeEmail(),
  body("password").isString().isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
    .bail().matches(/[A-Za-z]/).withMessage("Password must contain a letter")
    .bail().matches(/[0-9]/).withMessage("Password must contain a number"),
];

/** Validates login fields without disclosing which credential is incorrect.
 * @returns {import("express-validator").ValidationChain[]} Login validation chains.
 * @throws {Error} Validation errors are surfaced by `validate`.
 */
export const loginValidator = [
  body("email").trim().isEmail().withMessage("Enter a valid email address").normalizeEmail(),
  body("password").isString().notEmpty().withMessage("Email and password are required"),
];
