import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);

  const navigate = useNavigate();

  // CHECK EMAIL
  const checkEmail = async () => {
    const response = await fetch("http://localhost:8080/check-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (data === "Email Exist") {
      setEmailVerified(true); // SHOW PASSWORD FIELDS
    }

    setMessage(data);
  };

  // UPDATE PASSWORD
  const updatePassword = async () => {
    const response = await fetch("http://localhost:8080/update-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, confirmPassword }),
    });

    const data = await response.json();

    if (data === "Password Updated") {
      navigate("/login");
    }

    setMessage(data);
  };

  return (
    <div>
      <h2>Forgot Password</h2>

      {/* EMAIL */}
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <button onClick={checkEmail}>Check Email</button>

      <br /><br />

      {/* PASSWORD SECTION (ONLY AFTER EMAIL VERIFIED) */}
      {emailVerified && (
        <>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <br />

          <button onClick={updatePassword}>Update Password</button>
        </>
      )}

      <p>{message}</p>
    </div>
  );
}

export default ForgotPassword;
