import {
    getAllProducts as getAllProductsService,
    getProductById as getProductByIdService,
    createProduct as createProductService,
    updateProduct as updateProductService,
    deleteProduct as deleteProductService,
} from "../services/productService.js";

// ----------------------
// GET ALL PRODUCTS
// ----------------------
export const getAllProducts = async (req, res) => {
    try {
        const products = await getAllProductsService();
        res.json(products);
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// ----------------------
// GET SINGLE PRODUCT
// ----------------------
export const getProductById = async (req, res) => {
    try {
        const product = await getProductByIdService(req.params.id);
        res.json(product);
    } catch (err) {
        console.error("Error fetching product:", err);
        res.status(err.message === "Product not found" ? 404 : 500).json({ message: err.message });
    }
};

// ----------------------
// CREATE PRODUCT
// ----------------------
export const createProduct = async (req, res) => {
    try {
        const newProduct = await createProductService(req.body);
        res.status(201).json(newProduct);
    } catch (err) {
        console.error("Error creating product:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// ----------------------
// UPDATE PRODUCT
// ----------------------
export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await updateProductService(req.params.id, req.body);
        res.json(updatedProduct);
    } catch (err) {
        console.error("Error updating product:", err);
        res.status(err.message === "Product not found" ? 404 : 500).json({ message: err.message });
    }
};

// ----------------------
// DELETE PRODUCT
// ----------------------
export const deleteProduct = async (req, res) => {
    try {
        const result = await deleteProductService(req.params.id);
        res.json(result);
    } catch (err) {
        console.error("Error deleting product:", err);
        res.status(err.message === "Product not found" ? 404 : 500).json({ message: err.message });
    }
};
