import express from 'express';
import { authenticateToken } from '../utils/authMiddleware.js';

import pool from '../db.js';


const router = express.Router();

router.get('/dashboard', authenticateToken, async (req, res) => {
    try {

        const userId = req.user.id;
        const user = await pool.query('SELECT username, email FROM users WHERE id = $1', [userId]);

        res.json({ message: "Welcome to your dashboard", user: user.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

export default router;
