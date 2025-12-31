// backend/services/productService.js
import pool from "../db.js";

// ----------------------
// GET ALL PRODUCTS
// ----------------------
export const getAllProducts = async () => {
    const result = await pool.query(
        "SELECT * FROM products ORDER BY id DESC"
    );
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
export const createProduct = async (data) => {
    const { name, description, price, image } = data;

    if (!name || !price) {
        throw new Error("Name and price are required");
    }

    const parsedPrice = Number(price);
    if (isNaN(parsedPrice)) {
        throw new Error("Invalid price");
    }

    const result = await pool.query(
        `
        INSERT INTO products (name, description, price, image)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
        [
            name.trim(),
            description || "",
            parsedPrice,
            image || ""
        ]
    );

    return result.rows[0];
};

// ----------------------
// UPDATE PRODUCT
// ----------------------
export const updateProduct = async (id, data) => {
    const { name, description, price, image } = data;

    const parsedPrice = price !== undefined ? Number(price) : null;
    if (price !== undefined && isNaN(parsedPrice)) {
        throw new Error("Invalid price");
    }

    const result = await pool.query(
        `
        UPDATE products
        SET
            name = COALESCE($1, name),
            description = COALESCE($2, description),
            price = COALESCE($3, price),
            image = COALESCE($4, image)
        WHERE id = $5
        RETURNING *
        `,
        [
            name?.trim() ?? null,
            description ?? null,
            parsedPrice,
            image ?? null,
            id
        ]
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
        "DELETE FROM products WHERE id = $1 RETURNING id",
        [id]
    );

    if (result.rows.length === 0) {
        throw new Error("Product not found");
    }

    return { message: "Product deleted" };
};

