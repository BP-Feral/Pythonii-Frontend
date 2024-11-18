import React, { useState } from 'react';
import './login.css';

function LoginPage() {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Username: ${formData.username}, Password: ${formData.password}`);
  };

  return (
    <div className="login-page">
      <div className="login-box">
        {/* User Icon */}
        <div className="user-icon">
          <i className="fas fa-user-circle"></i>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <span className="icon"><i className="fas fa-user"></i></span>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
            />
          </div>
          <div className="form-group">
            <span className="icon"><i className="fas fa-lock"></i></span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="login-button">LOGIN</button>
          <div className="options">
            <label>
              <input type="checkbox" name="remember" /> Remember me
            </label>
            <a href="#" className="forgot-password">Forgot password</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
