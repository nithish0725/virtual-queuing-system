import React, { useState } from "react";
import "./AuthPages.css";

function AdminLogin({ setPage }) {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");

  const handleAdminLogin = () => {
    if (adminId === "admin" && password === "1234") {
      alert("Admin login successful");
      setPage("adminDashboard");
    } else {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png"
          alt="Admin Login"
          className="auth-image"
        />

        <h2>Admin Login</h2>

        <input
          placeholder="Admin Username"
          value={adminId}
          onChange={(e) =>
            setAdminId(e.target.value)
          }
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button onClick={handleAdminLogin}>
          Login
        </button>

        <button onClick={() => setPage("home")}>
          Back
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;