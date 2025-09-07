
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
                setLoading(false);
            } catch (err) {
                console.error("Error fetching products:", err);
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
                        {/* Product Image */}
                        {product.image ? (
                            <img src={product.image} alt={product.name} />
                        ) : (
                            <div className="placeholder-img">No image</div>
                        )}

                        {/* Product Info */}
                        <h3>{product.name}</h3>
                        <p>${product.price}</p>

                        {/* Link to details */}
                        <Link to={`/product/${product.id}`} className="details-link">
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;
