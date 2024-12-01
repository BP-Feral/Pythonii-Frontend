import React, { useState } from "react";
import "../styles/LoginPage.css"; // Add this file for styles
import Nav from "../components/Navbar";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Correct router import for v6

const LoginView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    try {
      const response = await fetch("http://localhost:8000/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      const data = await response.json();
      // Store tokens in localStorage or cookie
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      navigate("/calendar"); // Redirect to calendar page
    } catch (err) {
      setError(err.message);
    }
  };

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
            <form onSubmit={handleLogin}>
              <div className="input-group">
                <FaUser className="icon" />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="input-group">
                <FaLock className="icon" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="login-button">
                Login
              </button>
            </form>
            {error && <p className="error-message">{error}</p>}
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