import express from "express";
import authMiddleware from "../utils/authMiddleware.js";
import adminMiddleware from "../utils/adminMiddleware.js";

const router = express.Router();


router.get("/dashboard", authMiddleware, adminMiddleware, async (req, res) => {
    res.json({ message: "Welcome, admin! You have access to the admin dashboard." });
});

export default router;
