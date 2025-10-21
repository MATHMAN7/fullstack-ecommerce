import express from 'express';
import { authenticateToken } from '../utils/authMiddleware.js';
import pool from '../db.js';

const router = express.Router();


router.get('/', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const userResult = await pool.query(
            'SELECT username, email FROM users WHERE id = $1',
            [userId]
        );

        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: "Welcome to your dashboard", user: userResult.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

export default router;

