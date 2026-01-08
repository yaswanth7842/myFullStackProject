import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

export function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // ✅ Clear old token
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    const res = await fetch("http://localhost:8092/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      alert("Invalid credentials");
      return;
    }

    const data = await res.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);

    navigate("/");
  };

  return (
    <div className="container">
      {/* Left Image */}
      <div className="left-image">
        <img
          src="./pexels-maksgelatin-4352247.jpg"
          alt="leftSide"
        />
      </div>

      {/* Right Form */}
      <div className="right-content">
        <form className="form" onSubmit={handleLogin}>
          <h2 className="title">Sign in</h2>
          <p className="subtitle">
            Welcome back! Please sign in to continue
          </p>

          <button type="button" className="google-btn">
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
              alt="google"
            />
          </button>

          <div className="divider">
            <span></span>
            <p>or sign in with email</p>
            <span></span>
          </div>

          <div className="input-box">
            <img width="15" height="15" viewBox="0 0 13 17" src="./mail.png" alt="" />
            <input type="email" placeholder="Email id" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="input-box">

            <img width="15" height="15" viewBox="0 0 13 17" src="./lock_15630793.png" alt="" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <div className="options">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <Link to="/forgotpassword">Forgot password?</Link>
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>

          <p className="signup">
            Don’t have an account? <Link to="/Register">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}


export default Login;

