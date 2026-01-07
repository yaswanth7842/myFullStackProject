import { useState } from "react";
import { useNavigate } from "react-router-dom";


function ForgotPassword() {
  // state
   const navigate = useNavigate();  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");

  // function to call backend
  const checkEmail = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8092/auth/checkemail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({email})
    });

    const data = await res.text();
    if(data==="Email verified"){
      setStep(2);
      setMessage("");
    }
    setMessage(data);
  };
  const updatePassword=async()=>{
    const token = localStorage.getItem("token");
    const res=await fetch("http://localhost:8092/auth/checkemail/forgotpassword",{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body:JSON.stringify({
        email,
        password,
        conformpassword:confirmPassword
      })
    });
     const data = await res.text();

    if (data ==="Password updated") {
      navigate("/login");
    }
    setMessage(data);
  };

  // **Return JSX for the UI**
   return (
    <div>
      {step === 1 && (
        <>
          <h3>Enter Email</h3>
          <input value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email" />
          <button onClick={checkEmail}>Next</button>
        </>
      )}

      {step === 2 && (
        <>
          <h3>Set New Password</h3>
          <input type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password" />
          <input type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password" />
          <button onClick={updatePassword}>Update</button>
        </>
      )}

      <p>{message}</p>
    </div>
  );
}

export default ForgotPassword;