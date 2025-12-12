// backend/services/productService.js
import pool from "../db.js";

// ----------------------
// GET ALL PRODUCTS
// ----------------------
export const getAllProducts = async () => {
    const result = await pool.query("SELECT * FROM products");
    return result.rows;
};

// ----------------------
// GET SINGLE PRODUCT BY ID
// ----------------------
export const getProductById = async (id) => {
    const result = await pool.query(
        "SELECT * FROM products WHERE id = $1",
        [id]
    );

    if (result.rows.length === 0) {
        throw new Error("Product not found");
    }

    return result.rows[0];
};

// ----------------------
// CREATE PRODUCT
// ----------------------
export const createProduct = async ({ name, description, price, image }) => {
    const result = await pool.query(
        "INSERT INTO products (name, description, price, image) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, description, price, image]
    );

    return result.rows[0];
};

// ----------------------
// UPDATE PRODUCT
// ----------------------
export const updateProduct = async (id, { name, description, price, image }) => {
    const result = await pool.query(
        "UPDATE products SET name=$1, description=$2, price=$3, image=$4 WHERE id=$5 RETURNING *",
        [name, description, price, image, id]
    );

    if (result.rows.length === 0) {
        throw new Error("Product not found");
    }

    return result.rows[0];
};

// ----------------------
// DELETE PRODUCT
// ----------------------
export const deleteProduct = async (id) => {
    const result = await pool.query(
        "DELETE FROM products WHERE id=$1 RETURNING *",
        [id]
    );

    if (result.rows.length === 0) {
        throw new Error("Product not found");
    }

    return { message: "Product deleted" };
};
