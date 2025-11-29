import { Link, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./NavBar.css";

function NavBar() {
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

    const isActive = (path) =>
        location.pathname === path ? "active-link" : "";

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

