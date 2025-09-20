import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/image/logo.png";

import "./header.css";

function Header() {
  return (
    <header className="text-white bg-header-footer">
      <nav className="navbar navbar-expand-lg container py-2">
        <div className="d-flex align-items-center">
          <img
            src={logo}
            alt="logo"
            className="me-2"
            style={{ width: "40px" }}
          />
          <h5 className="mb-0">Motite Fura Primary Hospital</h5>
        </div>
        <button
          className="navbar-toggler text-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav w-100 justify-content-end text-center align-items-center">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">
                HOME
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/about">
                ABOUT US
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/services">
                SERVICES
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/contact">
                CONTACT US
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                <button className="btn bg-button d-flex align-items-center gap-2">
                  
                  <span className="text-white"><i className="bi bi-box-arrow-in-right pe-2 text-white"></i>Login</span>
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
