import express from "express"
import { requireAuth } from "../middleware/auth.middleware.js"
import { conversationValidator } from "../validators/conversation.validator.js"
import { validate } from "../middleware/validate.middleware.js"
import { getAllConversation, getMessagesByConversation, handleMessage } from "../controller/conversation.controller.js"

let router = express.Router()

router.post("/", requireAuth, conversationValidator, validate, handleMessage)


router.get('/', requireAuth , getAllConversation)
router.get('/messages/:conversationId', requireAuth , getMessagesByConversation)

export default router