import express from "express";
import pool from "../db.js";
import authMiddleware from "../utils/authMiddleware.js";
import adminMiddleware from "../utils/adminMiddleware.js";

const router = express.Router();


router.post("/", authMiddleware, async (req, res) => {
    const client = await pool.connect();
    try {
        const userId = req.user.id;
        const { cartItems } = req.body;

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const total = cartItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        await client.query("BEGIN");

        const orderResult = await client.query(
            "INSERT INTO orders (user_id, total, status, created_at) VALUES ($1, $2, $3, NOW()) RETURNING id",
            [userId, total, "pending"]
        );
        const orderId = orderResult.rows[0].id;

        for (const item of cartItems) {
            await client.query(
                "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)",
                [orderId, item.id, item.quantity, item.price]
            );
        }

        await client.query("COMMIT");
        res.json({ message: "Order placed successfully", orderId, total });
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
            `SELECT o.id, o.total, o.status, o.created_at,
                    json_agg(
                        json_build_object(
                            'product_id', oi.product_id,
                            'quantity', oi.quantity,
                            'price', oi.price,
                            'name', p.name
                        )
                    ) AS items
             FROM orders o
             JOIN order_items oi ON o.id = oi.order_id
             JOIN products p ON oi.product_id = p.id
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
            `SELECT o.id, o.total, o.status, o.created_at,
                    json_agg(
                        json_build_object(
                            'product_id', oi.product_id,
                            'quantity', oi.quantity,
                            'price', oi.price,
                            'name', p.name
                        )
                    ) AS items
             FROM orders o
             JOIN order_items oi ON o.id = oi.order_id
             JOIN products p ON oi.product_id = p.id
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


router.get("/admin/all", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT o.id, o.total, o.status, o.created_at, u.email,
                    json_agg(
                        json_build_object(
                            'product_id', oi.product_id,
                            'quantity', oi.quantity,
                            'price', oi.price,
                            'name', p.name
                        )
                    ) AS items
             FROM orders o
             JOIN users u ON u.id = o.user_id
             JOIN order_items oi ON o.id = oi.order_id
             JOIN products p ON oi.product_id = p.id
             GROUP BY o.id, u.email
             ORDER BY o.created_at DESC`
        );

        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching admin orders:", err);
        res.status(500).json({ message: "Server error" });
    }
});

router.put("/admin/:id/status", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body;

        if (!["pending", "processing", "completed", "cancelled"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        await pool.query(
            "UPDATE orders SET status = $1 WHERE id = $2",
            [status, orderId]
        );

        res.json({ message: "Order status updated" });
    } catch (err) {
        console.error("Error updating order status:", err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;

