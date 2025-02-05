import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <div className="app container mt-4">
        <ToastContainer />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route
            path="/"
            element={isAuthenticated ? <Home isAuthenticated={isAuthenticated} /> : <Login setIsAuthenticated={setIsAuthenticated} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
