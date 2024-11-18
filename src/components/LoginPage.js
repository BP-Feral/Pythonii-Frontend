import React from "react";
import "./LoginPage.css"; // Add this file for styles

import { FaUser, FaLock } from "react-icons/fa";

const LoginForm = () => {
  return (
    <div className="login-page">
      {/* Navbar here if not included globally */}

      <div className="login-container">
        {/* Login Form */}
        <div className="login-form">
          <div className="icon-placeholder">
            <img src="/assets/user.png" alt="User" />
          </div>
          <form>
          <div className="input-group">
            <FaUser className="icon" />
            <input type="text" placeholder="Username" />
          </div>
          <div className="input-group">
            <FaLock className="icon" />
            <input type="password" placeholder="Password" />
          </div>
            <button className="login-button">Login</button>
          </form>
          <div className="login-options">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="/forgot-password">Forgot password?</a>
          </div>
        </div>

        {/* University Logo Section */}
        <div className="logo-section">
          <img
            src="/assets/usv-standard-centrat.png"
            alt="University Logo"
            className="university-logo"
          />
          <h2>Universitatea "Ștefan cel Mare" din Suceava</h2>
          <p>Visualise reserved rooms</p>
          <p>Reserve exam online</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;