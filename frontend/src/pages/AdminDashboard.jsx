import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";

function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const response = await fetch("http://localhost:5000/admin/stats", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch admin stats");
                }

                const data = await response.json();
                setStats(data);
            } catch (err) {
                console.error("Error fetching admin stats:", err);
                setError("Could not load admin stats.");
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return <p>Loading dashboard...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Users</h3>
                    <p>{stats.totalUsers}</p>
                </div>
                <div className="stat-card">
                    <h3>Products</h3>
                    <p>{stats.totalProducts}</p>
                </div>
                <div className="stat-card">
                    <h3>Orders</h3>
                    <p>{stats.totalOrders}</p>
                </div>
                <div className="stat-card">
                    <h3>Revenue</h3>
                    <p>${stats.totalRevenue.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
