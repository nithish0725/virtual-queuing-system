import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import "./AdminDashboard.css";

const socket = io("http://localhost:5000");

function AdminDashboard({ setPage }) {
  const [urgentData, setUrgentData] = useState(null);
  const [currentToken, setCurrentToken] = useState(null);
  const [queueList, setQueueList] = useState([]);

  useEffect(() => {
    socket.on("urgentAlert", (data) => {
      setUrgentData(data);
      alert("New urgent request received");
    });

    return () => {
      socket.off("urgentAlert");
    };
  }, []);

  const approveRequest = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/queue/priority/${urgentData.token}`
      );

      setCurrentToken(response.data.token);
      setUrgentData(null);

      await viewQueue();

      alert("Urgent request approved");
    } catch {
      alert("Failed to approve request");
    }
  };

  const rejectRequest = () => {
    alert("Urgent request rejected");
    setUrgentData(null);
  };

  const callNext = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/queue/next"
      );

      setCurrentToken(response.data.token);
      await viewQueue();
    } catch {
      alert("No users in queue");
    }
  };

  const viewQueue = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/queue/current"
      );

      setQueueList(response.data);
    } catch {
      alert("Failed to fetch queue");
    }
  };

  const skipToken = async () => {
    try {
      await axios.put(
        "http://localhost:5000/api/queue/skip"
      );

      setCurrentToken(null);
      await viewQueue();
    } catch {
      alert("Failed to skip token");
    }
  };

  const completeToken = async () => {
    try {
      await axios.put(
        "http://localhost:5000/api/queue/complete"
      );

      setCurrentToken(null);
      await viewQueue();
    } catch {
      alert("Failed to complete token");
    }
  };

  const resetQueue = async () => {
    try {
      await axios.delete(
        "http://localhost:5000/api/queue/reset"
      );

      setQueueList([]);
      setCurrentToken(null);
    } catch {
      alert("Failed to reset queue");
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-card">
        <h1>Admin Dashboard</h1>

        <div className="token-box">
          <h2>Current Token</h2>
          <h1>{currentToken || "None"}</h1>
        </div>

        {urgentData && (
          <div className="urgent-panel">
            <h3>Urgent Request</h3>
            <p>Token: {urgentData.token}</p>
            <p>Reason: {urgentData.reason}</p>
            <p>Document: {urgentData.document}</p>

            <button onClick={approveRequest}>
              Approve
            </button>

            <button onClick={rejectRequest}>
              Reject
            </button>
          </div>
        )}

        <div className="admin-buttons">
          <button onClick={callNext}>
            Call Next
          </button>

          <button onClick={skipToken}>
            Skip Token
          </button>

          <button onClick={completeToken}>
            Complete Token
          </button>

          <button onClick={viewQueue}>
            View Queue
          </button>

          <button onClick={resetQueue}>
            Reset Queue
          </button>
        </div>

        <div className="queue-list">
          {queueList.map((item) => (
            <p key={item._id}>
              Token: {item.tokenNumber} | Status:{" "}
              {item.status}
            </p>
          ))}
        </div>

        <button
          className="back-btn"
          onClick={() => setPage("home")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;