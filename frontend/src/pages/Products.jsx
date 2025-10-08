import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Products.css";

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/products");
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                console.error("Error fetching products:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return <p>Loading products...</p>;
    }

    return (
        <div className="products-container">
            <h2>Our Products</h2>
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
        </div>
    );
}

export default Products;
