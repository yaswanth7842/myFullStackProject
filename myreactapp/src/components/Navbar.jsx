import { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="navbar">
            {/* Logo */}
            <a href="https://prebuiltui.com" className="logo">
                FurniNest
            </a>

            {/* Desktop Menu */}
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/Product">Products</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/cart">Cart</Link></li>
            </ul>
            <div className="auth-links">
                <Link to="/login">Login</Link>
                <button className="cta-btn desktop-only">
                <Link to="/register">Register</Link>
            </button>
            </div>
            
            {/* Desktop Button */}
            {/* <button className="cta-btn desktop-only">
                Get started
            </button> */}


            {/* Mobile Menu Button */}
            <button
                aria-label="menu"
                className="menu-btn mobile-only"
                onClick={() => setOpen(!open)}
            >
                <svg width="30" height="30" viewBox="0 0 30 30">
                    <path d="M3 7h24M3 15h24M3 23h24" stroke="black" strokeWidth="2" />
                </svg>
            </button>

            {/* Mobile Menu */}
            {open && (
                <div className="mobile-menu">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/Product">Products</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/cart">Cart</Link></li>
                    </ul>

                    <button className="cta-btn">
                        Get started
                    </button>
                </div>

            )}
        </nav>
    );
}
