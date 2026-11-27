import { body } from "express-validator";

/** Validates a new conversation message request.
 * @returns {import("express-validator").ValidationChain[]} Conversation request validation chains.
 * @throws {Error} Validation errors are surfaced by `validate`.
 */
export const conversationValidator = [
  body("content")
    .exists().withMessage("Content is required")
    .bail()
    .isString().withMessage("Content must be a string")
    .bail()
    .trim()
    .notEmpty().withMessage("Content is required"),
  body("conversation")
    .optional()
    .isMongoId().withMessage("Conversation must be a valid MongoDB ObjectId"),
];
