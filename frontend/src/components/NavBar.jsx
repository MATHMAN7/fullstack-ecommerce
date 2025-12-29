import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./NavBar.css";

function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const token = localStorage.getItem("authToken");
    let isAdmin = false;

    if (token) {
        try {
            const decoded = jwtDecode(token);
            isAdmin = decoded?.is_admin === true;
        } catch (err) {
            console.error("Invalid token", err);
            localStorage.removeItem("authToken");
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    };

    const isActive = (path) => location.pathname === path ? "active-link" : "";

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <span className="burger" onClick={() => setMenuOpen(!menuOpen)}>
                    &#9776;
                </span>
                <Link to="/dashboard" className="brand-title">MyShop</Link>
            </div>

            <ul className={`navbar-list ${menuOpen ? "open" : ""}`}>
                <li>
                    <Link to="/dashboard" className={isActive("/dashboard")} onClick={() => setMenuOpen(false)}>
                        Dashboard
                    </Link>
                </li>

                <li>
                    <Link to="/products" className={isActive("/products")} onClick={() => setMenuOpen(false)}>
                        Products
                    </Link>
                </li>

                <li>
                    <Link to="/cart" className={isActive("/cart")} onClick={() => setMenuOpen(false)}>
                        Cart
                    </Link>
                </li>

                <li>
                    <Link to="/orders" className={isActive("/orders")} onClick={() => setMenuOpen(false)}>
                        Orders
                    </Link>
                </li>

                {isAdmin && (
                    <li>
                        <Link to="/admin" className={isActive("/admin")} onClick={() => setMenuOpen(false)}>
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
