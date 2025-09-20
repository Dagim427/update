import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/image/logo.png";
import Logout from "../../pages/root/sign-in/Logout";

const PatientSidebar = ({ isMobileNavVisible, toggleMobileNav }) => {
  return (
    <div className={`dashboard-nav ${isMobileNavVisible ? "mobile-show" : ""}`}>
      <header className="bg-header-footer">
        <button className="menu-toggle" onClick={toggleMobileNav}></button>
        <a href="#" className="brand-logo">
          <span>
            <img src={Logo} className="logo pe-3" />
            Motite Fura
          </span>
        </a>
      </header>
      <nav className="dashboard-nav-list">
        <h5 className="dashboard-nav-item ps-3 text-center text-white bg-sidebar-header d-flex align-items-center justify-content-center mb-0">
          PATIENT MENU
        </h5>

        <Link to="/patient" className="dashboard-nav-item text-decoration-none ">
          Dashboard
        </Link>

        <Link to="/patient/prescription-read" className="dashboard-nav-item text-decoration-none">
          Prescripiton Read
        </Link>
        <Link to='/patient/medical-record' className="dashboard-nav-item text-decoration-none">
          Medical History
        </Link>
        <Link
          to="/change-password-patient"
          className="dashboard-nav-item text-decoration-none"
        >
          Change Password
        </Link>
        <Link to="/" className="dashboard-nav-item text-decoration-none">
          <Logout />
        </Link>
      </nav>
    </div>
  );
};

export default PatientSidebar;
