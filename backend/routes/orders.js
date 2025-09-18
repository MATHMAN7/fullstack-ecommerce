import express from "express";
import pool from "../db.js";
import authMiddleware from "../utils/authMiddleware.js";

const router = express.Router();


router.post("/", authMiddleware, async (req, res) => {
    const client = await pool.connect();
    try {
        const userId = req.user.id;
        const { cartItems } = req.body;

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        await client.query("BEGIN");

        const orderResult = await client.query(
            "INSERT INTO orders (user_id, status, created_at) VALUES ($1, $2, NOW()) RETURNING id",
            [userId, "pending"]
        );
        const orderId = orderResult.rows[0].id;

        for (const item of cartItems) {
            await client.query(
                "INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3)",
                [orderId, item.id, item.quantity]
            );
        }

        await client.query("COMMIT");
        res.json({ message: "Order placed successfully", orderId });
    } catch (err) {
        await client.query("ROLLBACK");
        console.error("Error creating order:", err);
        res.status(500).json({ message: "Server error" });
    } finally {
        client.release();
    }
});


router.get("/", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;

        const ordersResult = await pool.query(
            `SELECT o.id, o.status, o.created_at,
                    json_agg(json_build_object(
                            'product_id', oi.product_id,
                            'quantity', oi.quantity
                             )) AS items
             FROM orders o
                      JOIN order_items oi ON o.id = oi.order_id
             WHERE o.user_id = $1
             GROUP BY o.id
             ORDER BY o.created_at DESC`,
            [userId]
        );

        res.json(ordersResult.rows);
    } catch (err) {
        console.error("Error fetching orders:", err);
        res.status(500).json({ message: "Server error" });
    }
});


router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const orderId = req.params.id;

        const orderResult = await pool.query(
            `SELECT o.id, o.status, o.created_at,
                    json_agg(json_build_object(
                            'product_id', oi.product_id,
                            'quantity', oi.quantity
                             )) AS items
             FROM orders o
                      JOIN order_items oi ON o.id = oi.order_id
             WHERE o.user_id = $1 AND o.id = $2
             GROUP BY o.id`,
            [userId, orderId]
        );

        if (orderResult.rows.length === 0) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json(orderResult.rows[0]);
    } catch (err) {
        console.error("Error fetching order:", err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
