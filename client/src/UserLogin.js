import React, { useState } from "react";
import axios from "axios";
import "./AuthPages.css";

function UserLogin({ setPage }) {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleLogin = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      alert("Login successful");
      setPage("userDashboard");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="User Login"
          className="auth-image"
        />

        <h2>User Login</h2>

        <input
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          placeholder="Password"
          type="password"
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value
            })
          }
        />

        <button onClick={handleLogin}>
          Login
        </button>

        <button onClick={() => setPage("home")}>
          Back
        </button>
      </div>
    </div>
  );
}

export default UserLogin;