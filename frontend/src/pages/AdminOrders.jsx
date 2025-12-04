import { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";

function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const token = localStorage.getItem("authToken");

    const fetchOrders = async () => {
        try {
            const res = await fetch("http://localhost:5000/admin/orders", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Failed to fetch orders");
            const data = await res.json();
            setOrders(data);
        } catch (err) {
            console.error(err);
            setError("Could not load orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        try {
            const res = await fetch(`http://localhost:5000/admin/orders/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });
            if (!res.ok) throw new Error("Failed to update order");
            fetchOrders();
        } catch (err) {
            alert("Error updating order");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this order?")) return;
        try {
            const res = await fetch(`http://localhost:5000/admin/orders/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Failed to delete order");
            fetchOrders();
        } catch (err) {
            alert("Error deleting order");
        }
    };

    if (loading) return <p>Loading orders...</p>;
    if (error) return <p>{error}</p>;

    return (
        <AdminLayout>
            <div className="admin-orders">
                <h2>Admin – Manage Orders</h2>
                <table className="admin-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Products</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.user_email}</td>
                            <td>
                                {order.items.map((i) => (
                                    <div key={i.id}>{i.name} x{i.quantity}</div>
                                ))}
                            </td>
                            <td>${order.total.toFixed(2)}</td>
                            <td>
                                <select
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(order.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}

export default AdminOrders;
