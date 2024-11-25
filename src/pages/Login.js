import React from "react";
import "../styles/LoginPage.css"; // Add this file for styles
import Nav from "../components/nav"

import { Link } from "react-router";
import { FaUser, FaLock } from "react-icons/fa";

const LoginView = () => {
  return (
    <div>
      <Nav />
      <div className="login-page">
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
              <Link to="/calendar"> <button className="login-button">Login</button> </Link>
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
    </div>
  );
};

export default LoginView;