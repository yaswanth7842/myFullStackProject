import { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("token");
            const userRole = localStorage.getItem("role");

            setIsLoggedIn(!!token);
            setRole(userRole);
        };

        // initial check
        checkAuth();

        // listen for login/logout
        window.addEventListener("authChange", checkAuth);

        return () => {
            window.removeEventListener("authChange", checkAuth);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        // notify all components
        window.dispatchEvent(new Event("authChange"));

        navigate("/login");
    };

    return (
        <nav className="navbar">
            <Link to="/" className="logo">FurniNest</Link>

            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                {role === "ROLE_ADMIN" ? (
                    <li><Link to="/product">Add Products</Link></li>
                ) : (
                    <li><Link to="/products">Products</Link></li>
                )}
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/cart">Cart</Link></li>
            </ul>

            {/* AUTH BUTTONS (DESKTOP) */}
            <div className="auth-links">
                {!isLoggedIn && (
                    <>
                        <Link to="/login">Login</Link>

                        <button className="cta-btn desktop-only">
                            <Link to="/register">Register</Link>
                        </button>
                    </>
                )}

                {isLoggedIn && (
                    <button className="cta-btn" onClick={handleLogout}>
                        Logout
                    </button>
                )}
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
                className="menu-btn mobile-only"
                onClick={() => setOpen(!open)}
            >
                ☰
            </button>

            {/* MOBILE MENU */}
            {open && (
                <div className="mobile-menu">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        {role === "ROLE_ADMIN" ? (
                            <li><Link to="/product">Add Products</Link></li>
                        ) : (
                            <li><Link to="/productlist">Products</Link></li>
                        )}
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/cart">Cart</Link></li>
                    </ul>

                    {!isLoggedIn && (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}

                    {isLoggedIn && (
                        <button className="cta-btn" onClick={handleLogout}>
                            Logout
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
}
