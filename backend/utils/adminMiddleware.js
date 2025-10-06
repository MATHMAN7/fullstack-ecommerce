import pool from "../db.js";

const adminMiddleware = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const result = await pool.query(
            "SELECT is_admin FROM users WHERE id = $1",
            [userId]
        );

        if (result.rows.length === 0 || !result.rows[0].is_admin) {
            return res.status(403).json({ message: "Access denied: Admins only" });
        }

        next();
    } catch (err) {
        console.error("Admin middleware error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

export default adminMiddleware;
