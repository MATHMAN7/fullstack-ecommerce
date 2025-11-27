import { Link, useNavigate, useLocation } from "react-router-dom";
import "./NavBar.css";
import * as jwtDecode from "jwt-decode"; // ✅ Vite-friendly import

function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    };

    const isActive = (path) => (location.pathname === path ? "active-link" : "");

    let isAdmin = false;
    const token = localStorage.getItem("authToken");
    if (token) {
        try {
            const decoded = jwtDecode.default(token); // ✅ call default
            isAdmin = decoded.is_admin;
        } catch {}
    }

    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li>
                    <Link to="/dashboard" className={isActive("/dashboard")}>
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/products" className={isActive("/products")}>
                        Products
                    </Link>
                </li>
                <li>
                    <Link to="/cart" className={isActive("/cart")}>
                        Cart
                    </Link>
                </li>
                <li>
                    <Link to="/orders" className={isActive("/orders")}>
                        Orders
                    </Link>
                </li>

                {isAdmin && (
                    <li>
                        <Link to="/admin" className={isActive("/admin")}>
                            Admin Dashboard
                        </Link>
                    </li>
                )}

                <li>
                    <button onClick={handleLogout}>Logout</button>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
