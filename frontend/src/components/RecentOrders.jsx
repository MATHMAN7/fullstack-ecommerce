import "./RecentOrders.css";

function RecentOrders({ orders }) {

    const sampleOrders = [
        { id: 1, product: "Wireless Headphones", date: "2025-10-01", status: "Delivered", total: 89.99 },
        { id: 2, product: "Gaming Mouse", date: "2025-10-07", status: "Shipped", total: 49.99 },
        { id: 3, product: "Mechanical Keyboard", date: "2025-10-09", status: "Processing", total: 119.99 },
    ];

    const displayOrders = orders && orders.length > 0 ? orders : sampleOrders;

    return (
        <div className="recent-orders">
            <h2>Recent Orders</h2>
            <table>
                <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Product</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Total</th>
                </tr>
                </thead>
                <tbody>
                {displayOrders.map((order) => (
                    <tr key={order.id}>
                        <td>#{order.id}</td>
                        <td>{order.product}</td>
                        <td>{order.date}</td>
                        <td>
                                <span className={`status ${order.status.toLowerCase()}`}>
                                    {order.status}
                                </span>
                        </td>
                        <td>${order.total.toFixed(2)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default RecentOrders;
