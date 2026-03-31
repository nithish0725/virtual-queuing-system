import React, { useState } from "react";
import LandingPage from "./LandingPage";
import UserLogin from "./UserLogin";
import UserRegister from "./UserRegister";
import AdminLogin from "./AdminLogin";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";
import QueuePage from "./QueuePage";

function App() {
  const [page, setPage] = useState("home");
  const [token, setToken] = useState(null);

  return (
    <div>
      {page === "home" && <LandingPage setPage={setPage} />}
      {page === "userLogin" && <UserLogin setPage={setPage} />}
      {page === "userRegister" && <UserRegister setPage={setPage} />}
      {page === "adminLogin" && <AdminLogin setPage={setPage} />}
      {page === "userDashboard" && (
        <UserDashboard setPage={setPage} setToken={setToken} />
      )}
      {page === "adminDashboard" && (
        <AdminDashboard setPage={setPage} />
      )}
      {page === "queuePage" && (
        <QueuePage token={token} setPage={setPage} />
      )}
    </div>
  );
}

export default App;