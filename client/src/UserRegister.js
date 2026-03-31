import React, { useState } from "react";
import axios from "axios";
import "./AuthPages.css";

function UserRegister({ setPage }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleRegister = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );

      alert("Registered successfully");
      setPage("userLogin");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png"
          alt="Register"
          className="auth-image"
        />

        <h2>User Register</h2>

        <input
          placeholder="Name"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value
            })
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

        <button onClick={handleRegister}>
          Register
        </button>

        <button onClick={() => setPage("home")}>
          Back
        </button>
      </div>
    </div>
  );
}

export default UserRegister;