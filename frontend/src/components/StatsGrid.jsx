import "./StatsGrid.css";

function StatsGrid({ stats }) {
    const defaultStats = {
        totalOrders: 0,
        totalSpent: 0,
        pendingOrders: 0,
    };

    const s = stats || defaultStats;

    return (
        <div className="stats-grid">
            <div className="stat-card">
                <h3>Total Orders</h3>
                <p>{s.totalOrders}</p>
            </div>

            <div className="stat-card">
                <h3>Pending Orders</h3>
                <p>{s.pendingOrders}</p>
            </div>

            <div className="stat-card">
                <h3>Total Spent</h3>
                <p>${s.totalSpent}</p>
            </div>
        </div>
    );
}

export default StatsGrid;
