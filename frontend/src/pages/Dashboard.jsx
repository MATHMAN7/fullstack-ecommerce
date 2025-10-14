import { useEffect, useState } from "react";
import "./Dashboard.css";
import StatsGrid from "../components/StatsGrid";
import RecentOrders from "../components/RecentOrders";


function Dashboard() {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setMessage("You are not logged in");
            return;
        }

        fetch("http://localhost:5000/api/dashboard", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.user) setUser(data.user);
                else setMessage(data.message);
            })
            .catch(() => setMessage("Error fetching dashboard data"));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (
        <div className="dashboard">


            <div className="dashboard-content">

                <div className="welcome-card">
                    <h2 className="dash-title">Dashboard</h2>
                    {user ? (
                        <div className="user-info">
                            <p>Welcome, <strong>{user.username}</strong>!</p>
                            <p>Email: {user.email}</p>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    ) : (
                        <p>{message}</p>
                    )}
                </div>


                <div className="main-content">
                    <h1>Welcome to your Dashboard</h1>
                    <p className="subtitle">Here’s a quick overview of your activity.</p>


                    <StatsGrid />


                    <RecentOrders />
                </div>
            </div>


        </div>
    );
}

export default Dashboard;
