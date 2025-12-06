import express from "express";
import { authenticateToken } from "../utils/authMiddleware.js";
import { adminStats } from "../controllers/adminController.js";

const router = express.Router();

router.get("/stats", authenticateToken, adminStats);

export default router;
