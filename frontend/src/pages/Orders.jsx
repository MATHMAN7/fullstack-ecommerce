import React, { useEffect, useState } from "react";
import "./Orders.css";

function Orders({ onDataReady }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("authToken");
                if (!token) {
                    setError("You must be logged in to view orders.");
                    setLoading(false);
                    if (onDataReady) onDataReady();
                    return;
                }

                const response = await fetch("http://localhost:5000/api/orders", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch orders: ${response.status}`);
                }

                const data = await response.json();
                setOrders(data);
            } catch (err) {
                console.error("Error fetching orders:", err);
                setError("Unable to load orders. Please try again later.");
            } finally {
                setLoading(false);
                if (onDataReady) onDataReady(); // signal to PageWrapper that page is ready
            }
        };

        fetchOrders();
    }, [onDataReady]);


    if (loading) return null;

    if (error) {
        return (
            <div className="error-container">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="orders-container">
            <h2>Your Orders</h2>
            {orders.length === 0 ? (
                <p className="no-orders">You have no orders yet.</p>
            ) : (
                <ul className="orders-list">
                    {orders.map((order) => (
                        <li key={order.id} className="order-card">
                            <h3>Order #{order.id}</h3>
                            <p>Status: {order.status}</p>
                            <p>Date: {new Date(order.created_at).toLocaleString()}</p>
                            <ul>
                                {order.items.map((item, i) => (
                                    <li key={i}>
                                        {item.name} × {item.quantity} (${item.price})
                                    </li>
                                ))}
                            </ul>
                            <p>Total: ${order.total}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Orders;
