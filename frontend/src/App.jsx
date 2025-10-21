import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useMemo } from "react";
import Login from "./pages/Login";
import RegisterPage from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/AdminDashboard";
import MainLayout from "./components/MainLayout";

function App() {
    const isAuthenticated = useMemo(() => !!localStorage.getItem("authToken"), []);

    return (
        <Router>
            <Routes>

                <Route
                    path="/"
                    element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
                />


                <Route
                    path="/login"
                    element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />}
                />
                <Route
                    path="/register"
                    element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterPage />}
                />


                <Route element={<PrivateRoute><MainLayout /></PrivateRoute>}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="products" element={<Products />} />
                    <Route path="product/:id" element={<ProductDetail />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="checkout" element={<Checkout />} />
                </Route>

                <Route
                    path="/admin"
                    element={<PrivateRoute><AdminDashboard /></PrivateRoute>}
                />


                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
