import express from "express";
import { authenticateToken } from "../utils/authMiddleware.js";
import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} from "../controllers/userController.js";

const router = express.Router();

// Admin: Get all users
router.get("/", authenticateToken, getAllUsers);

// Admin or self: Get single user
router.get("/:id", authenticateToken, getUserById);

// Admin: Update user
router.put("/:id", authenticateToken, updateUser);

// Admin: Delete user
router.delete("/:id", authenticateToken, deleteUser);

export default router;
