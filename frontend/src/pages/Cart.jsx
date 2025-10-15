import { useState, useEffect } from "react";
import "./Cart.css";

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(cart);
        calculateTotal(cart);
    }, []);

    const calculateTotal = (cart) => {
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalPrice(total);
    };

    const handleRemove = (id) => {
        const updatedCart = cartItems.filter((item) => item.id !== id);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCartItems(updatedCart);
        calculateTotal(updatedCart);
    };

    const handleCheckout = async () => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            setMessage("You must be logged in to place an order.");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ cartItems }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage("Order placed successfully!");
                localStorage.removeItem("cart");
                setCartItems([]);
                setTotalPrice(0);
            } else {
                setMessage(data.message || "Failed to place order");
            }
        } catch (err) {
            console.error(err);
            setMessage("Error placing order");
        }
    };

    return (
        <section className="cart-section">
            <div className="cart-container">
                <h2>Your Cart</h2>

                {cartItems.length === 0 ? (
                    <p className="empty-cart">Your cart is empty</p>
                ) : (
                    <>
                        <div className="cart-list">
                            {cartItems.map((item) => (
                                <div key={item.id} className="cart-item">
                                    {item.image && (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="cart-item-image"
                                        />
                                    )}
                                    <div className="cart-item-info">
                                        <h3>{item.name}</h3>
                                        <p className="cart-item-price">
                                            ${item.price} × {item.quantity}
                                        </p>
                                    </div>
                                    <button
                                        className="remove-btn"
                                        onClick={() => handleRemove(item.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="cart-summary">
                            <h3>Total: ${totalPrice.toFixed(2)}</h3>
                            <button className="checkout-btn" onClick={handleCheckout}>
                                Place Order
                            </button>
                        </div>
                    </>
                )}

                {message && <p className="message">{message}</p>}
            </div>
        </section>
    );
}

export default Cart;
