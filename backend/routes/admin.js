import express from "express";
import { authenticateToken } from "../utils/authMiddleware.js";
import adminMiddleware from "../utils/adminMiddleware.js";

import { adminStats } from "../controllers/adminController.js";
import { getAllUsers, updateUser, deleteUser } from "../controllers/userController.js";
import { getAllProducts, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import { fetchOrders, updateOrder, removeOrder } from "../controllers/orderController.js";

const router = express.Router();

// stats
router.get("/stats", authenticateToken, adminMiddleware, adminStats);

// users
router.get("/users", authenticateToken, adminMiddleware, getAllUsers);
router.put("/users/:id", authenticateToken, adminMiddleware, updateUser);
router.delete("/users/:id", authenticateToken, adminMiddleware, deleteUser);

// products
router.get("/products", authenticateToken, adminMiddleware, getAllProducts);
router.post("/products", authenticateToken, adminMiddleware, createProduct);
router.put("/products/:id", authenticateToken, adminMiddleware, updateProduct);
router.delete("/products/:id", authenticateToken, adminMiddleware, deleteProduct);

// orders
router.get("/orders", authenticateToken, adminMiddleware, fetchOrders);
router.put("/orders/:id", authenticateToken, adminMiddleware, updateOrder);
router.delete("/orders/:id", authenticateToken, adminMiddleware, removeOrder);

export default router;
