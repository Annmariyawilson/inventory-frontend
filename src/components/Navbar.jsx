import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isAuthenticated, handleLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="fas fa-boxes"></i> Inventory Management
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-controls="navbarNav"
          aria-expanded={isMenuOpen ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <span className={isMenuOpen ? "navbar-toggler-icon d-none" : "navbar-toggler-icon"}></span>
          <span className={isMenuOpen ? "fas fa-times" : "d-none"}></span> 
        </button>

        <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    <i className="fas fa-home"></i> Home
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-danger" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <i className="fas fa-sign-in-alt"></i> Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    <i className="fas fa-user-plus"></i> Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
