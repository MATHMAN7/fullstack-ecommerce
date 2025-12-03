import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";

function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadStats = async () => {
            try {
                const token = localStorage.getItem("authToken");

                const res = await fetch("http://localhost:5000/admin/stats", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!res.ok) throw new Error("Failed");

                setStats(await res.json());
            } catch {
                setError("Could not load admin stats.");
            } finally {
                setLoading(false);
            }
        };

        loadStats();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <AdminLayout>
            <h1>Dashboard Overview</h1>

            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Users</h3>
                    <p>{stats.totalUsers}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Products</h3>
                    <p>{stats.totalProducts}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Orders</h3>
                    <p>{stats.totalOrders}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Revenue</h3>
                    <p>${stats.totalRevenue.toFixed(2)}</p>
                </div>
            </div>
        </AdminLayout>
    );
}

export default AdminDashboard;
