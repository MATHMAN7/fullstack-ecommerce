import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleAddToCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingItemIndex = cart.findIndex(item => item.id === product.id);

        if (existingItemIndex >= 0) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${product.name} added to cart!`);
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/products/${id}`);
                const data = await res.json();
                setProduct(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching product:", err);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) {
        return <p>Loading product...</p>;
    }

    if (!product) {
        return <p>Product not found</p>;
    }

    return (
        <div className="product-detail">
            {product.image ? (
                <img src={product.image} alt={product.name} />
            ) : (
                <div className="placeholder-img">No image</div>
            )}

            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p><strong>Price:</strong> ${product.price}</p>

            <button onClick={handleAddToCart}>Add to Cart</button>
            <Link to="/cart">Go to Cart</Link>

            <Link to="/products">← Back to Products</Link>
        </div>
    );
}

export default ProductDetail;
