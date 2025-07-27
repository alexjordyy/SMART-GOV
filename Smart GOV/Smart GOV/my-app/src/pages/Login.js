import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      const responseToken = response.data.token;
      localStorage.setItem("authToken", responseToken);
      navigate("/home");
    } catch (error) {
      alert(error.response ? error.response.data.error : error.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2 className="login-title">Welcome Back!</h2>
        <p>Log in to access your dashboard</p>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          <div className="form-footer">
            <p>
              Have to create account? <Link to="/user/signup">Get Started</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
