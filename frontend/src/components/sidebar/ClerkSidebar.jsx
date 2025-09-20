import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from '../../assets/image/logo.png'
import Logout from "../../pages/root/sign-in/Logout";

const ClerkSidebar = ({ isMobileNavVisible, toggleMobileNav }) => {
  const [isOpen, setIsopen] = useState(false);

  const handleDropDown = () => {
    setIsopen(!isOpen)
  }
  return (
    <div className={`dashboard-nav ${isMobileNavVisible ? "mobile-show" : ""}`}>
      <header className="bg-header-footer">
        <button className="menu-toggle" onClick={toggleMobileNav}>
        </button>
        <a href="#" className="brand-logo">
          <span><img src={Logo} className="logo pe-3" />Motite Fura</span>
        </a>
      </header>
      <nav className="dashboard-nav-list">
        <h5 className="dashboard-nav-item ps-3 text-center text-white bg-sidebar-header d-flex align-items-center justify-content-center mb-0">
          CLERK MENU
        </h5>

        <Link to='/clerk' className="dashboard-nav-item text-decoration-none ">
          Dashboard
        </Link>
        <button
          onClick={handleDropDown}
          className="dashboard-nav-item text-white text-decoration-none "
          style={{ background: "#387a99", borderBottom: "1px solid white" }}
        >
          Patient <i className="bi bi-caret-down-fill ms-2"></i>
        </button>
        {isOpen && <div>
          <Link to="/clerk/view-patient-registeration" className="dashboard-nav-item text-decoration-none">
            View Patient
          </Link>
          <Link to='/clerk/patient-registeration' className="dashboard-nav-item text-decoration-none">
            Add Patient
          </Link>
        </div>}
        <Link to='/clerk/profile' className="dashboard-nav-item text-decoration-none">
          <i className="bi bi-person-circle me-2"></i>
          My Profile
        </Link>
        <Link to='/change-password' className="dashboard-nav-item text-decoration-none">
          Change Password
        </Link>
        <Link to='/' className="dashboard-nav-item text-decoration-none">
          <Logout />
        </Link>
      </nav>
    </div>
  );
};

export default ClerkSidebar;
