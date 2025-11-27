import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import React from "react";

export default function PrivateRoute({ children, adminOnly = false }) {
    const token = localStorage.getItem("authToken");

    if (!token) return <Navigate to="/login" replace />;

    try {
        const decoded = jwtDecode(token);


        if (decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem("authToken");
            return <Navigate to="/login" replace />;
        }


        if (adminOnly && !decoded.is_admin) {
            return <Navigate to="/dashboard" replace />;
        }
    } catch (err) {
        localStorage.removeItem("authToken");
        return <Navigate to="/login" replace />;
    }

    return children;
}
