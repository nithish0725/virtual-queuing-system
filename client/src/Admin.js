import React, { useEffect, useState } from "react";

function Admin({ goBack }) {
  const [queue, setQueue] = useState([]);

  // 🔥 Fetch full queue
  const fetchQueue = async () => {
    try {
      const res = await fetch("/api/queue/all");
      const data = await res.json();
      setQueue(data);
    } catch (err) {
      console.error("Queue fetch error:", err);
    }
  };

  // 🔥 Call next token
  const callNext = async () => {
    try {
      await fetch("/api/queue/call-next", {
        method: "PUT"
      });
      fetchQueue();
    } catch (err) {
      console.error("Call next error:", err);
    }
  };

  // 🔥 Skip token
  const skipToken = async (id) => {
    try {
      await fetch(`/api/queue/skip/${id}`, {
        method: "PUT"
      });
      fetchQueue();
    } catch (err) {
      console.error("Skip error:", err);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>

      <button onClick={goBack}>⬅ Back to Customer</button>
      <button onClick={callNext}>Call Next</button>

      <h2>Queue List</h2>

      {queue.map((item) => (
        <div key={item._id} style={{ marginBottom: "10px" }}>
          <p>
            Token: {item.tokenNumber} | Name: {item.name} | Status: {item.status}
          </p>

          {item.status === "waiting" && (
            <button onClick={() => skipToken(item._id)}>Skip</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Admin;