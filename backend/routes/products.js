import express from 'express';
import { authenticateToken } from '../utils/authMiddleware.js';
import adminMiddleware from '../utils/adminMiddleware.js';
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js';
import { uploadProductImage } from '../utils/uploadMiddleware.js';

const router = express.Router();

// ----------------------
// Public Routes
// ----------------------
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// ----------------------
// Admin Routes
// ----------------------

// POST: Create Product

router.post(
    '/',
    uploadProductImage.array('images', 5),
    authenticateToken,
    adminMiddleware,
    createProduct
);

// PUT: Update Product
router.put(
    '/:id',
    uploadProductImage.array('images', 5),
    authenticateToken,
    adminMiddleware,
    updateProduct
);

// DELETE: Delete Product
router.delete(
    '/:id',
    authenticateToken,
    adminMiddleware,
    deleteProduct
);

export default router;