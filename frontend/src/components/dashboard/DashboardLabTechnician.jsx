import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import LabTechnicianSidebar from '../sidebar/LabTechnicianSidebar';
import LabTechnicianContent from '../content/LabTechnicianContent';


const DashboardLabTechnician = () => {
  const [isMobileNavVisible, setMobileNavVisible] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavVisible(!isMobileNavVisible);
  };

  return (
    <div className={`dashboard ${isMobileNavVisible ? 'dashboard-compact' : ''}`}>
      <LabTechnicianSidebar
        isMobileNavVisible={isMobileNavVisible}
        toggleMobileNav={toggleMobileNav}
      />
      <div className="dashboard-app">
        <Navbar toggleMobileNav={toggleMobileNav} />
        <LabTechnicianContent />
      </div>
    </div>
  );
};

export default DashboardLabTechnician;
