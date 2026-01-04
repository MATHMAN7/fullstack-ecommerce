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

// Public routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Admin routes
// uploadProductImage.array("images", 5) -> allow up to 5 images
router.post(
    '/',
    authenticateToken,
    adminMiddleware,
    uploadProductImage.array('images', 5),
    createProduct
);

router.put(
    '/:id',
    authenticateToken,
    adminMiddleware,
    uploadProductImage.array('images', 5),
    updateProduct
);

router.delete('/:id', authenticateToken, adminMiddleware, deleteProduct);

export default router;
