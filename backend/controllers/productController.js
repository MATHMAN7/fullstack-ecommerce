import pool from "../db.js";

// ----------------------
// GET ALL PRODUCTS
// ----------------------
export const getAllProducts = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM products");
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// ----------------------
// GET SINGLE PRODUCT
// ----------------------
export const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            "SELECT * FROM products WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error fetching product:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// ----------------------
// CREATE PRODUCT (Admin)
// ----------------------
export const createProduct = async (req, res) => {
    const { name, description, price, image } = req.body;

    try {
        const result = await pool.query(
            "INSERT INTO products (name, description, price, image) VALUES ($1, $2, $3, $4) RETURNING *",
            [name, description, price, image]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Error creating product:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// ----------------------
// UPDATE PRODUCT (Admin)
// ----------------------
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, image } = req.body;

    try {
        const result = await pool.query(
            "UPDATE products SET name=$1, description=$2, price=$3, image=$4 WHERE id=$5 RETURNING *",
            [name, description, price, image, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error updating product:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// ----------------------
// DELETE PRODUCT (Admin)
// ----------------------
export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            "DELETE FROM products WHERE id=$1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ message: "Product deleted" });
    } catch (err) {
        console.error("Error deleting product:", err);
        res.status(500).json({ message: "Server error" });
    }
};
