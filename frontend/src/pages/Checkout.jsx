import React from "react";
import "./Checkout.css";

function Checkout() {
    const handleConfirmOrder = () => {
        alert("Order confirmed! (placeholder)");
    };

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>

            <div className="checkout-section">
                <h3>Shipping Address</h3>
                <input type="text" placeholder="Full Name" />
                <input type="text" placeholder="Address" />
                <input type="text" placeholder="City" />
                <input type="text" placeholder="Postal Code" />
            </div>

            <div className="checkout-section">
                <h3>Payment Info</h3>
                <input type="text" placeholder="Card Number" />
                <input type="text" placeholder="Expiration Date" />
                <input type="text" placeholder="CVV" />
            </div>

            <button className="confirm-btn" onClick={handleConfirmOrder}>
                Confirm Order
            </button>
        </div>
    );
}

export default Checkout;
