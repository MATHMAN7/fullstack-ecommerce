import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import RegisterPage from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import NavBar from "./components/NavBar";

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
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <>
                                <NavBar />
                                <Dashboard />
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


