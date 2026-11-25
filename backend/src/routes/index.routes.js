import { Router } from "express";
import authRoutes from "./auth.routes.js";

const router = Router();

/** Mounts API feature routers.
 * @returns {Router} Versioned API router.
 * @throws {Error} If route definitions are invalid.
 */
router.use("/auth", authRoutes);

export default router;
