import React, { useState } from "react";
import LabTechnicianSidebar from '../../components/sidebar/LabTechnicianSidebar'
import Navbar from "../../components/navbar/Navbar";
import SendLabResultForm from "./SendLabResultForm";

const DoctorEvalution = () => {
  const [isMobileNavVisible, setMobileNavVisible] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavVisible(!isMobileNavVisible);
  };

  return (
    <div
      className={`dashboard ${isMobileNavVisible ? "dashboard-compact" : ""}`}
    >
      <LabTechnicianSidebar
        isMobileNavVisible={isMobileNavVisible}
        toggleMobileNav={toggleMobileNav}
      />
      <div className="dashboard-app">
        <Navbar toggleMobileNav={toggleMobileNav} />
        <SendLabResultForm />
      </div>
    </div>
  );
};

export default DoctorEvalution;
