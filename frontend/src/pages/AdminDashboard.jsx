import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) throw new Error("Failed to fetch admin stats");

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
        <div className="admin-layout">


            <aside className="admin-sidebar">
                <h2 className="sidebar-title">Admin Panel</h2>

                <nav className="sidebar-nav">
                    <Link to="/admin" className="sidebar-link">Dashboard</Link>
                    <Link to="/admin/products" className="sidebar-link">Manage Products</Link>
                    <Link to="/admin/orders" className="sidebar-link">Manage Orders</Link>
                    <Link to="/admin/users" className="sidebar-link">Manage Users</Link>
                    <Link to="/admin/settings" className="sidebar-link">Settings</Link>
                </nav>
            </aside>


            <main className="admin-main">
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


                <div className="management-links">
                    <h2>Management</h2>

                    <div className="link-grid">
                        <Link to="/admin/products" className="mg-card">
                            <h3>Products</h3>
                            <p>Create, edit, and delete products.</p>
                        </Link>

                        <Link to="/admin/orders" className="mg-card">
                            <h3>Orders</h3>
                            <p>View and manage customer orders.</p>
                        </Link>

                        <Link to="/admin/users" className="mg-card">
                            <h3>Users</h3>
                            <p>View and manage user accounts.</p>
                        </Link>

                        <Link to="/admin/settings" className="mg-card">
                            <h3>Settings</h3>
                            <p>Admin configuration and preferences.</p>
                        </Link>
                    </div>
                </div>
            </main>

        </div>
    );
}

export default AdminDashboard;
