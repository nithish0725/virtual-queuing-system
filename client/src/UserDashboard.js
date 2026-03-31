import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import "./UserDashboard.css";

const socket = io("http://localhost:5000");

function UserDashboard({ setPage }) {
  const [queueList, setQueueList] = useState([]);
  const [reason, setReason] = useState("");
  const [document, setDocument] = useState("");
  const [myToken, setMyToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("userToken");
    if (savedToken) {
      setMyToken(savedToken);
    }
  }, []);

  const joinQueue = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/queue/join",
        { userName: "Test User" }
      );

      const token = response.data.token;
      setMyToken(token);
      localStorage.setItem("userToken", token);

      alert(`Token generated successfully: ${token}`);
    } catch (error) {
      alert("Failed to join queue");
    }
  };

  const viewQueue = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/queue/current"
      );

      setQueueList(response.data);
    } catch (error) {
      alert("Failed to fetch queue");
    }
  };

  const urgentRequest = () => {
    const requestData = {
      reason,
      document,
      token: myToken
    };

    socket.emit("urgentRequest", requestData);

    alert("Urgent request submitted");
    setReason("");
    setDocument("");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1>User Dashboard</h1>

        <div className="button-row">
          <button onClick={joinQueue}>
            Join Queue
          </button>

          <button onClick={viewQueue}>
            View Queue
          </button>
        </div>

        {myToken && (
          <div className="token-box">
            <h2>Your Token</h2>
            <h1>{myToken}</h1>
          </div>
        )}

        {myToken && (
          <div className="urgent-box">
            <h3>Urgent Request</h3>

            <textarea
              placeholder="Enter reason"
              value={reason}
              onChange={(e) =>
                setReason(e.target.value)
              }
            />

            <input
              placeholder="Document link / name"
              value={document}
              onChange={(e) =>
                setDocument(e.target.value)
              }
            />

            <button onClick={urgentRequest}>
              Submit Request
            </button>
          </div>
        )}

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
          Back
        </button>
      </div>
    </div>
  );
}

export default UserDashboard;