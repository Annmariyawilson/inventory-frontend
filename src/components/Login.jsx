import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../api"; 

const Login = ({ setIsAuthenticated }) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(credentials); 
      localStorage.setItem("token", data.token); 
      setIsAuthenticated(true); 
      toast.success(`Welcome back, ${credentials.username}!`, { position: "top-right" }); 

      setCredentials({ username: "", password: "" }); 
      navigate("/"); 
    } catch (error) {
      console.error("Login error:", error.message);
      toast.error(error.message, { position: "top-right" }); 
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Login</h2>
      <form
        onSubmit={handleLogin}
        className="p-4 shadow-lg rounded bg-light"
        autoComplete="off"
      >
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your username"
            required
            autoComplete="off"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your password"
            required
            autoComplete="new-password"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
};

export default Login;
