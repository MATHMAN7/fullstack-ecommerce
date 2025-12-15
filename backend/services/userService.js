import pool from "../db.js";

// Admin: Get all users
export const getAllUsersService = async () => {
    const result = await pool.query("SELECT id, name, email, is_admin, created_at FROM users ORDER BY created_at DESC");
    return result.rows;
};

// Get user by ID
export const getUserByIdService = async (id) => {
    const result = await pool.query("SELECT id, name, email, is_admin, created_at FROM users WHERE id=$1", [id]);
    return result.rows[0];
};

// Update user
export const updateUserService = async (id, { name, email, is_admin }) => {
    const result = await pool.query(
        "UPDATE users SET name=$1, email=$2, is_admin=$3 WHERE id=$4 RETURNING id, name, email, is_admin, created_at",
        [name, email, is_admin, id]
    );
    return result.rows[0];
};

// Delete user
export const deleteUserService = async (id) => {
    const result = await pool.query("DELETE FROM users WHERE id=$1 RETURNING id", [id]);
    return result.rows[0];
};
