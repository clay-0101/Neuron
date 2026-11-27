import { Router } from "express";
import authRoutes from "./auth.routes.js";
import conversationRoute from "./conversation.routes.js"

const router = Router();

/** Mounts API feature routers.
 * @returns {Router} Versioned API router.
 * @throws {Error} If route definitions are invalid.
 */
router.use("/auth", authRoutes);
router.use("/conversation", conversationRoute)

export default router;
