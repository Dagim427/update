import React from "react";
import Logout from "../../pages/root/sign-in/Logout";

const Navbar = ({ toggleMobileNav }) => {
  return (
    <header className="dashboard-toolbar bg-header-footer d-flex justify-content-between">
      <button className="menu-toggle" onClick={toggleMobileNav}>
        <i className="bi bi-list"></i>
      </button>
      <Logout />
    </header>
  );
};

export default Navbar;
