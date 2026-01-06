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
          age: formData.age,
          email: formData.email,
          password: formData.password
        })
      });

      const text = await response.text();

      if (response.ok) {
        setMessage("Registration successful. Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
      else {
        setMessage(text);
      }
    } catch (error) {
      setMessage("Server error while registering");
    }
  };

  return (
    <div className="signup-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="title">Create account</h2>
        <p className="subtitle">
          Sign up to get started with your account
        </p>

        {/* Name */}
        <div className="input-box">
          <img width="15" height="15" viewBox="0 0 24 24" src="./user.png" alt=""></img>
          <input type="text" placeholder="Full name" value={formData.name} onChange={handleChange} required />
        </div>

        {/* Email */}
        <div className="input-box">
          <img width="15" height="15" viewBox="0 0 16 11" src="./mail.png" alt=""></img>
          <input type="email" placeholder="Email address" value={formData.email} onChange={handleChange} required />
        </div>

        {/* Password */}
        <div className="input-box">
          <img width="15" height="15" viewBox="0 0 13 17" src="./lock_15630793.png" alt=""></img>
          <input type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        </div>

        {/* Confirm Password */}
        <div className="input-box">
          <img width="15" height="15" viewBox="0 0 13 17" src="./lock_15630793.png" alt=""></img>

          <input type="password" placeholder="Confirm password" value={formData.confirmPassword} onChange={handleChange} required />
        </div>

        {/* Terms */}
        <div className="options">
          <label>
            <input type="checkbox" required /> I agree to the terms
          </label>
        </div>

        <button type="submit" className="login-btn">
          Sign up
        </button>
        {message && <p className="message">{message}</p>}

        <p className="signup">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </div>
  );
}
export default RegisterPage;
