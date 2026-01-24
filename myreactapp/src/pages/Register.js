import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterPage.css";

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: ""
  });

  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ================= SEND OTP =================
  const sendOtp = async () => {
    if (!formData.email) {
      setMessage("Please enter email first");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:8092/auth/otp/send?email=${formData.email}`,
        { method: "POST" }
      );

      const text = await res.text();
      setMessage(text);

      if (res.ok) {
        setOtpSent(true);
      }
    } catch (err) {
      setMessage("OTP send failed");
    }
  };

  // ================= VERIFY OTP =================
  const verifyOtp = async () => {
    try {
      const res = await fetch(
        `http://localhost:8092/auth/otp/verify?email=${formData.email}&otp=${formData.otp}`,
        { method: "POST" }
      );

      const text = await res.text();
      if (!res.ok) {
        setMessage(text);
        return false;
      }

      return true;
    } catch {
      setMessage("OTP verification failed");
      return false;
    }
  };

  // ================= REGISTER =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    if (!otpSent) {
      setMessage("Please verify email first");
      return;
    }

    const otpOk = await verifyOtp();
    if (!otpOk) return;

    try {
      const registerRes = await fetch("http://localhost:8092/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const registerText = await registerRes.text();
      setMessage(registerText);

      if (registerText === "Register Sucessfully") {
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch {
      setMessage("Registration failed");
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="signup-title">Create account</h2>
        <p className="signup-subtitle">Sign up to get started with your account</p>

        {/* Name */}
        <div className="signup-input">
          <img src="./user.png" alt="" />
          <input
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
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {!otpSent && (
          <button type="button" onClick={sendOtp} className="signup-btn">
            Send OTP
          </button>
        )}

        {otpSent && (
          <div className="signup-input">
            <input
              name="otp"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {/* Password */}
        <div className="signup-input">
          <img src="./lock_15630793.png" alt="" />
          <input
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
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="signup-options">
          <input type="checkbox" required />
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
