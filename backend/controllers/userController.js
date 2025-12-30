import pool from "../db.js";

export const getAllUsers = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT id, email, is_admin FROM users ORDER BY id ASC"
        );
        res.json(result.rows);
    } catch (err) {
        console.error("GET ALL USERS ERROR:", err);
        res.status(500).json({ message: "Server error" });
    }
};

export const getUserById = async (req, res) => {
    const { id } = req.params;

    if (!req.user.is_admin && req.user.id !== Number(id)) {
        return res.status(403).json({ message: "Forbidden" });
    }

    try {
        const result = await pool.query(
            "SELECT id, email, is_admin FROM users WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error("GET USER ERROR:", err);
        res.status(500).json({ message: "Server error" });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { is_admin } = req.body;

    try {
        const result = await pool.query(
            "UPDATE users SET is_admin = $1 WHERE id = $2 RETURNING id, email, is_admin",
            [is_admin, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error("UPDATE USER ERROR:", err);
        res.status(500).json({ message: "Server error" });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            "DELETE FROM users WHERE id = $1 RETURNING id",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User deleted" });
    } catch (err) {
        console.error("DELETE USER ERROR:", err);
        res.status(500).json({ message: "Server error" });
    }
};
