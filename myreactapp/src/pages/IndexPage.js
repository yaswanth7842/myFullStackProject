import React from "react";
import { Link } from "react-router-dom";
import "./IndexPage.css";

function IndexPage() {
  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <h2 className="logo">FurniNest</h2>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/Product">Products</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/cart">Cart</Link>
        </div>

        <div className="auth-links">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>Comfort That Defines Your Home</h1>
          <p>
            Premium Sofas & Beds crafted for modern living.
            Quality, comfort, and style — delivered to your door.
          </p>

          <div className="hero-buttons">
            <Link to="/productList" className="primary-btn">
              Shop Now
            </Link>
            <Link to="/productList" className="secondary-btn">
              View Collections
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories">
        <h2>Shop By Category</h2>

        <div className="category-cards">
          <div className="category-card">
            <h3>Sofas</h3>
            <p>Luxury & comfort combined</p>
            <Link to="/products?category=sofa">Explore Sofas</Link>
          </div>

          <div className="category-card">
            <h3>Beds</h3>
            <p>Sleep better every night</p>
            <Link to="/products?category=bed">Explore Beds</Link>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="featured">
        <h2>Featured Products</h2>
        <p>Hand-picked furniture loved by our customers</p>

        <div className="featured-grid">
          <div className="product-card">
            <h4>Modern Fabric Sofa</h4>
            <p>₹24,999</p>
          </div>

          <div className="product-card">
            <h4>King Size Wooden Bed</h4>
            <p>₹39,999</p>
          </div>

          <div className="product-card">
            <h4>Luxury Recliner Sofa</h4>
            <p>₹49,999</p>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-us">
        <h2>Why Choose FurniNest?</h2>

        <div className="why-cards">
          <div className="why-card">
            <h4>Premium Quality</h4>
            <p>Built with durable materials and expert craftsmanship.</p>
          </div>

          <div className="why-card">
            <h4>Secure Payments</h4>
            <p>JWT secured login and safe checkout.</p>
          </div>

          <div className="why-card">
            <h4>Fast Delivery</h4>
            <p>Quick and reliable delivery across India.</p>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="cta">
        <h2>Upgrade Your Living Space Today</h2>
        <p>Browse our exclusive sofa and bed collections now.</p>
        <Link to="/productList" className="primary-btn">
          Start Shopping
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 FurniNest. All Rights Reserved.</p>
        <p className="admin-link">
          <Link to="/admin/login">Admin Login</Link>
        </p>
      </footer>
    </>
  );
}

export default IndexPage;
