import React from "react";

function QueuePage({ token, setPage }) {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>Your Token</h2>
      <h1>{token}</h1>
      <p>Estimated waiting time: 15 minutes</p>

      <button onClick={() => setPage("userDashboard")}>
        Back
      </button>
    </div>
  );
}

export default QueuePage;