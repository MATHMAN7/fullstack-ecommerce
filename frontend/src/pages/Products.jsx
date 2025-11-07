import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Products.css";
import PageLoader from "./PageLoader";

function Products({ onDataReady }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/products");
                if (!res.ok) throw new Error("Failed to fetch products");
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Unable to load products. Please try again later.");
            } finally {
                setLoading(false);
                if (onDataReady) onDataReady();
            }
        };
        fetchProducts();
    }, [onDataReady]);

    if (loading) return <PageLoader />;  // <— key change

    if (error) {
        return (
            <div className="page-fade">
                <div className="error-container">
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="page-fade products-container">
            <h2>Our Products</h2>
            {products.length === 0 ? (
                <p className="no-products">No products found.</p>
            ) : (
                <div className="products-grid">
                    {products.map((product) => (
                        <div key={product.id} className="product-card">
                            {product.image ? (
                                <img src={product.image} alt={product.name} />
                            ) : (
                                <div className="placeholder-img">No image</div>
                            )}
                            <div className="product-card-content">
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                                <p className="product-price">${product.price}</p>
                                <Link to={`/product/${product.id}`} className="add-to-cart-btn">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Products;



