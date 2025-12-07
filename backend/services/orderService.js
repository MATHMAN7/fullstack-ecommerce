import pool from "../db.js";

export const getAllOrders = async () => {
    const result = await pool.query(`
        SELECT o.id, o.user_id, o.total, o.status, o.created_at,
               u.email AS user_email
        FROM orders o
        JOIN users u ON o.user_id = u.id
        ORDER BY o.created_at DESC
    `);

    return result.rows;
};
