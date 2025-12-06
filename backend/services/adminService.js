import pool from "../db.js";

export const getAdminStats = async () => {
    const totalUsers = await pool.query("SELECT COUNT(*) FROM users");
    const totalProducts = await pool.query("SELECT COUNT(*) FROM products");
    const totalOrders = await pool.query("SELECT COUNT(*) FROM orders");
    const totalRevenue = await pool.query(
        "SELECT COALESCE(SUM(total), 0) AS total FROM orders WHERE status = 'completed'"
    );

    return {
        totalUsers: parseInt(totalUsers.rows[0].count),
        totalProducts: parseInt(totalProducts.rows[0].count),
        totalOrders: parseInt(totalOrders.rows[0].count),
        totalRevenue: parseFloat(totalRevenue.rows[0].total),
    };
};
