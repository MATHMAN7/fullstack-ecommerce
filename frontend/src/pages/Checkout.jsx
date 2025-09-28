import React, { useState } from "react";
import "./Checkout.css";

function Checkout() {
    const [status, setStatus] = useState(null);

    const handleConfirmOrder = () => {
        setStatus("Processing payment...");


        setTimeout(() => {
            setStatus("✅ Payment successful! Your order has been placed.");
        }, 1500);
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

            {status && <p className="payment-status">{status}</p>}
        </div>
    );
}

export default Checkout;
