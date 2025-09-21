import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import RegisterPage from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import NavBar from "./components/NavBar";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Footer from "./components/Footer";

const useAuth = () => {
    const token = localStorage.getItem("authToken");
    return !!token;
};

function App() {
    const isAuthenticated = useAuth();

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
                    }
                />
                <Route
                    path="/login"
                    element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
                />
                <Route
                    path="/register"
                    element={isAuthenticated ? <Navigate to="/dashboard" /> : <RegisterPage />}
                />

                {/* Authenticated routes with NavBar + Footer */}
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <>
                                <NavBar />
                                <Dashboard />
                                <Footer />
                            </>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/products"
                    element={
                        <PrivateRoute>
                            <>
                                <NavBar />
                                <Products />
                                <Footer />
                            </>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/product/:id"
                    element={
                        <PrivateRoute>
                            <>
                                <NavBar />
                                <ProductDetail />
                                <Footer />
                            </>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/cart"
                    element={
                        <PrivateRoute>
                            <>
                                <NavBar />
                                <Cart />
                                <Footer />
                            </>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/orders"
                    element={
                        <PrivateRoute>
                            <>
                                <NavBar />
                                <Orders />
                                <Footer />
                            </>
                        </PrivateRoute>
                    }
                />

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;

