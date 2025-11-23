import React from "react";
import { Navigate } from "react-router-dom";
import * as jwtDecode from "jwt-decode";

export default function PrivateRoute({ children, adminOnly = false }) {
    const token = localStorage.getItem("authToken");

    if (!token) return <Navigate to="/login" replace />;

    try {
        const decoded = jwtDecode.default(token);

        // Token expiration check
        if (decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem("authToken");
            return <Navigate to="/login" replace />;
        }

        // Admin-only route check
        if (adminOnly && !decoded.is_admin) {
            return <Navigate to="/dashboard" replace />;
        }
    } catch (err) {
        localStorage.removeItem("authToken");
        return <Navigate to="/login" replace />;
    }

    return children;
}

