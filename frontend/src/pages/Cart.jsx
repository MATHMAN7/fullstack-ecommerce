import { useState, useEffect } from "react";

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
        const updatedCart = cartItems.filter(item => item.id !== id);
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
                    "Authorization": `Bearer ${token}`,
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
        <div className="cart-page">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <ul>
                    {cartItems.map(item => (
                        <li key={item.id}>
                            {item.name} - ${item.price} x {item.quantity}
                            <button onClick={() => handleRemove(item.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
            <h3>Total: ${totalPrice}</h3>
            {cartItems.length > 0 && <button onClick={handleCheckout}>Place Order</button>}
            {message && <p>{message}</p>}
        </div>
    );
}

export default Cart;
