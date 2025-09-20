import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/image/logo.png";
import Logout from "../../pages/root/sign-in/Logout";

const Sidebar = ({ isMobileNavVisible, toggleMobileNav }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleDropDown = () => {
    setIsOpen(!isOpen);
  };

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
          ADMIN MENU
        </h5>
        <Link to="/admin" className="dashboard-nav-item text-decoration-none ">
          Dashboard
        </Link>
        <button
          onClick={handleDropDown}
          className="dashboard-nav-item text-white text-decoration-none "
          style={{ background: "#387a99", borderBottom: "1px solid white" }}
        >
          Employee <i className="bi bi-caret-down-fill ms-2"></i>
        </button>
        {isOpen && (
          <div>
            <Link
              to="/admin/employees"
              className="dashboard-nav-item text-decoration-none"
            >
              View Employee
            </Link>
            <Link
              to="/admin/add-employee"
              className="dashboard-nav-item text-decoration-none"
            >
              Add Employee
            </Link>
          </div>
        )}
        <Link
          to="/admin/view-feedback"
          className="dashboard-nav-item text-decoration-none"
        >
          View Feedback
        </Link>
        <Link
          to="/admin/profile"
          className="dashboard-nav-item text-decoration-none"
        >
          <i className="bi bi-person-circle me-2"></i>
          My Profile
        </Link>
        <Link
          to="/change-password"
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

export default Sidebar;
