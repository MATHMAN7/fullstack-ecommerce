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

const router = express.Router();

// Public routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Admin routes
router.post('/', authenticateToken, adminMiddleware, createProduct);
router.put('/:id', authenticateToken, adminMiddleware, updateProduct);
router.delete('/:id', authenticateToken, adminMiddleware, deleteProduct);

export default router;
;