import express from "express";
import pool from "../db.js";
import { authenticateToken } from "../utils/authMiddleware.js";


const router = express.Router();

router.get("/stats", authenticateToken, async (req, res) => {
    try {
        if (!req.user.is_admin) {
            return res.status(403).json({ message: "Access denied: Admins only." });
        }

        const totalUsersResult = await pool.query("SELECT COUNT(*) FROM users");
        const totalProductsResult = await pool.query("SELECT COUNT(*) FROM products");
        const totalOrdersResult = await pool.query("SELECT COUNT(*) FROM orders");
        const totalRevenueResult = await pool.query("SELECT COALESCE(SUM(total), 0) AS total FROM orders WHERE status = 'completed'");

        res.json({
            totalUsers: parseInt(totalUsersResult.rows[0].count),
            totalProducts: parseInt(totalProductsResult.rows[0].count),
            totalOrders: parseInt(totalOrdersResult.rows[0].count),
            totalRevenue: parseFloat(totalRevenueResult.rows[0].total),
        });
    } catch (err) {
        console.error("Error fetching admin stats:", err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
