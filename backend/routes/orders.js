import express from "express";
import { authenticateToken } from "../utils/authMiddleware.js";
import adminMiddleware from "../utils/adminMiddleware.js";

import {
    fetchOrders,
    updateOrder,
    removeOrder
} from "../controllers/orderController.js";

const router = express.Router();

router.get("/", authenticateToken, adminMiddleware, fetchOrders);
router.put("/:id", authenticateToken, adminMiddleware, updateOrder);
router.delete("/:id", authenticateToken, adminMiddleware, removeOrder);

export default router;


