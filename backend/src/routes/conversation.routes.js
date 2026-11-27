import express from "express"
import { requireAuth } from "../middleware/auth.middleware.js"
import { conversationValidator } from "../validators/conversation.validator.js"
import { validate } from "../middleware/validate.middleware.js"
import { handleMessage } from "../controller/conversation.controller.js"

let router = express.Router()

router.use("/", requireAuth, conversationValidator, validate, handleMessage)

export default router