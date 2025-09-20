import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import DoctorSidebar from '../sidebar/DoctorSidebar';
import DoctorContent from '../content/DoctorContent';


const DashboardDoctor = () => {
  const [isMobileNavVisible, setMobileNavVisible] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavVisible(!isMobileNavVisible);
  };

  return (
    <div className={`dashboard ${isMobileNavVisible ? 'dashboard-compact' : ''}`}>
      <DoctorSidebar
        isMobileNavVisible={isMobileNavVisible}
        toggleMobileNav={toggleMobileNav}
      />
      <div className="dashboard-app">
        <Navbar toggleMobileNav={toggleMobileNav} />
        <DoctorContent />
      </div>
    </div>
  );
};

export default DashboardDoctor;