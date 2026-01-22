import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterPage.css";

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:8092/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const text = await response.text();

      if (text==="Register Sucessfully") {
        setMessage("Registration successful. Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(text);
      }
    } catch {
      setMessage("Server error");
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="signup-title">Create account</h2>
        <p className="signup-subtitle">
          Sign up to get started with your account
        </p>

        {/* Name */}
        <div className="signup-input">
          <img src="./user.png" alt="" />
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="signup-input">
          <img src="./mail.png" alt="" />
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="signup-input">
          <img src="./lock_15630793.png" alt="" />
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="signup-input">
          <img src="./lock_15630793.png" alt="" />
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="signup-options">
          <input id="terms" name="terms" type="checkbox" required />
          <span>I agree to the terms</span>
        </div>

        <button type="submit" className="signup-btn">
          Sign up
        </button>

        {message && <p>{message}</p>}

        <p className="signup-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
