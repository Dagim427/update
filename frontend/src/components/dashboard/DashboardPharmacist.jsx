import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import PharmacistSidebar from '../sidebar/PharmacistSidebar';
import PharmacistContent from '../content/PharmacistContent';


const DashboardPatient = () => {
  const [isMobileNavVisible, setMobileNavVisible] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavVisible(!isMobileNavVisible);
  };

  return (
    <div className={`dashboard ${isMobileNavVisible ? 'dashboard-compact' : ''}`}>
      <PharmacistSidebar
        isMobileNavVisible={isMobileNavVisible}
        toggleMobileNav={toggleMobileNav}
      />
      <div className="dashboard-app">
        <Navbar toggleMobileNav={toggleMobileNav} />
        <PharmacistContent />
      </div>
    </div>
  );
};

export default DashboardPatient;