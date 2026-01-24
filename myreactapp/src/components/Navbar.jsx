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

    checkAuth();
    window.addEventListener("authChange", checkAuth);

    return () => {
      window.removeEventListener("authChange", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.dispatchEvent(new Event("authChange"));
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">FurniNest</Link>

      {/* DESKTOP MENU */}
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>

        {role === "ROLE_ADMIN" ? (
          <li><Link to="/product">Add Products</Link></li>
        ) : (
          <li><Link to="/productList">Products</Link></li>
        )}

        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/sofaproduct">Sofas</Link></li>
      </ul>

      {/* AUTH BUTTONS (DESKTOP) */}
      <div className="auth-links">
        {!isLoggedIn ? (
          <>
            <Link to="/login">Login</Link>
            <button className="cta-btn desktop-only">
              <Link to="/register">Register</Link>
            </button>
          </>
        ) : (
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
            <li><Link to="/" onClick={() => setOpen(false)}>Home</Link></li>

            {role === "ROLE_ADMIN" ? (
              <li>
                <Link to="/product" onClick={() => setOpen(false)}>
                  Add Products
                </Link>
              </li>
            ) : (
              <li>
                {/* ✅ FIXED HERE */}
                <Link to="/products" onClick={() => setOpen(false)}>
                  Products
                </Link>
              </li>
            )}

            <li><Link to="/contact" onClick={() => setOpen(false)}>Contact</Link></li>
            <li><Link to="/cart" onClick={() => setOpen(false)}>Cart</Link></li>
          </ul>

          {!isLoggedIn ? (
            <>
              <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
              <Link to="/register" onClick={() => setOpen(false)}>Register</Link>
            </>
          ) : (
            <button className="cta-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
