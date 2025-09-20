import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/image/logo.png";
import Logout from "../../pages/root/sign-in/Logout";

const TriageRoomSidebar = ({ isMobileNavVisible, toggleMobileNav }) => {
  const [isOpen, setOpen] = useState(false);

  function handleDropDown() {
    setOpen(!isOpen);
  }
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
          TRIAGE ROOM MENU
        </h5>

        <Link
          to="/triage-room"
          className="dashboard-nav-item text-decoration-none "
        >
          Dashboard
        </Link>
        <button
          onClick={handleDropDown}
          className="dashboard-nav-item text-white text-decoration-none "
          style={{ background: "#387a99", borderBottom: "1px solid white" }}
        >
          Pre Test <i className="bi bi-caret-down-fill ms-2"></i>
        </button>
        {isOpen && (
          <div>
            <Link
              to="/triage-room/view-pre-test"
              className="dashboard-nav-item text-decoration-none"
            >
              View Pre Test
            </Link>
            <Link
              to="/triage-room/pre-test"
              className="dashboard-nav-item text-decoration-none"
            >
              Add Pre Test
            </Link>
          </div>
        )}
        <Link
          to="/triage-room/profile"
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

export default TriageRoomSidebar;
