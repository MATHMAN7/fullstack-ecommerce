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
import RouteTransition from "./components/RouteTransition"; // use your file name here

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
                    <Route
                        path="dashboard"
                        element={
                            <RouteTransition>
                                <Dashboard />
                            </RouteTransition>
                        }
                    />
                    <Route
                        path="products"
                        element={
                            <RouteTransition>
                                <Products />
                            </RouteTransition>
                        }
                    />
                    <Route
                        path="product/:id"
                        element={
                            <RouteTransition>
                                <ProductDetail />
                            </RouteTransition>
                        }
                    />
                    <Route
                        path="cart"
                        element={
                            <RouteTransition>
                                <Cart />
                            </RouteTransition>
                        }
                    />
                    <Route
                        path="orders"
                        element={
                            <RouteTransition>
                                <Orders />
                            </RouteTransition>
                        }
                    />
                    <Route
                        path="checkout"
                        element={
                            <RouteTransition>
                                <Checkout />
                            </RouteTransition>
                        }
                    />
                </Route>

                <Route
                    path="/admin"
                    element={
                        <PrivateRoute adminOnly={true}>
                            <MainLayout>
                                <AdminDashboard />
                            </MainLayout>
                        </PrivateRoute>
                    }
                />



                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
