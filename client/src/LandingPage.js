import React from "react";
import "./LandingPage.css";
import queueImage from "./images/queue-people.png";
import globalImage from "./images/global.png";

function LandingPage({ setPage }) {
  return (
    <div className="landing-container">
      <div className="landing-left">
        <h1>Virtual Queuing System</h1>

        <p>
          A smart digital queue management system that allows
          users to book tokens online, track their waiting
          status, send urgent requests, and receive real-time
          notifications without standing in physical queues.
        </p>

        <div className="button-group">
          <button onClick={() => setPage("userLogin")}>
            User Login
          </button>

          <button onClick={() => setPage("userRegister")}>
            Register
          </button>

          <button onClick={() => setPage("adminLogin")}>
            Admin Login
          </button>
        </div>
      </div>

      <div className="landing-right">
        <img
          className="queue-image"
          src={queueImage}
          alt="People standing in queue"
        />

        <img
          className="global-image"
          src={globalImage}
          alt="Global digital network"
        />
      </div>
    </div>
  );
}

export default LandingPage;