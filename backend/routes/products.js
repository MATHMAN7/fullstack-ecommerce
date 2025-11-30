import express from 'express';
import pool from '../db.js';
import { authenticateToken } from '../utils/authMiddleware.js';
import adminMiddleware from '../utils/adminMiddleware.js';

const router = express.Router();

// Public: GET all products
router.get('/', async (req, res) => {
    try {
        const products = await pool.query('SELECT * FROM products');
        res.json(products.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Public: GET single product
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await pool.query(
            'SELECT * FROM products WHERE id = $1',
            [id]
        );
        if (product.rows.length === 0)
            return res.status(404).json({ message: 'Product not found' });
        res.json(product.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Admin: CREATE
router.post('/', authenticateToken, adminMiddleware, async (req, res) => {
    const { name, description, price, image } = req.body;
    try {
        const newProduct = await pool.query(
            'INSERT INTO products (name, description, price, image) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, description, price, image]
        );
        res.status(201).json(newProduct.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Admin: UPDATE
router.put('/:id', authenticateToken, adminMiddleware, async (req, res) => {
    const { id } = req.params;
    const { name, description, price, image } = req.body;

    try {
        const updated = await pool.query(
            'UPDATE products SET name=$1, description=$2, price=$3, image=$4 WHERE id=$5 RETURNING *',
            [name, description, price, image, id]
        );

        if (updated.rows.length === 0)
            return res.status(404).json({ message: 'Product not found' });

        res.json(updated.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Admin: DELETE
router.delete('/:id', authenticateToken, adminMiddleware, async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await pool.query(
            'DELETE FROM products WHERE id = $1 RETURNING *',
            [id]
        );

        if (deleted.rows.length === 0)
            return res.status(404).json({ message: 'Product not found' });

        res.json({ message: 'Product deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

export default router;
