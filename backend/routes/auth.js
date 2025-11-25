import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db.js";

const router = express.Router();


router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const exists = await pool.query(
            "SELECT id FROM users WHERE email = $1",
            [email]
        );

        if (exists.rows.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashed = await bcrypt.hash(password, 10);

        const newUser = await pool.query(
            "INSERT INTO users (username, email, password, is_admin) VALUES ($1, $2, $3, false) RETURNING *",
            [username, email, hashed]
        );

        res.json({ message: "User registered", user: newUser.rows[0] });
    } catch (err) {
        console.error("REGISTER ERROR:", err);
        res.status(500).json({ message: "Server error" });
    }
});



router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    console.log("LOGIN HIT:", req.body);

    try {
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (result.rows.length === 0) {
            console.log("No user found");
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const user = result.rows[0];

        console.log("USER:", user);

        const match = await bcrypt.compare(password, user.password);
        console.log("PASSWORD MATCH:", match);

        if (!match) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                is_admin: user.is_admin,
            },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        console.log("TOKEN CREATED:", token);

        return res.json({ token });
    } catch (err) {
        console.error("LOGIN ERROR:", err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
