import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../api"; 

const Register = () => {
  const [userDetails, setUserDetails] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await register(userDetails); 

      toast.success(`Account created successfully! Please login, ${userDetails.username}.`, { position: "top-right" }); 

      setUserDetails({ username: "", password: "" }); 
      navigate("/login"); 
    } catch (err) {
      console.error("Registration error:", err.message);
      toast.error(err.message || "Registration failed. Please try again.", { position: "top-right" }); 
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Register</h2>
      <form
        onSubmit={handleRegister}
        className="p-4 shadow-lg rounded bg-light"
        autoComplete="off"
      >
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            name="username"
            value={userDetails.username}
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
            value={userDetails.password}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your password"
            required
            autoComplete="new-password"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
