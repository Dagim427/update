import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import ClerkContent from '../content/ClerkContent';
import ClerkSidebar from '../sidebar/ClerkSidebar';


const DashboardClerk = () => {
  const [isMobileNavVisible, setMobileNavVisible] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavVisible(!isMobileNavVisible);
  };

  return (
    <div className={`dashboard ${isMobileNavVisible ? 'dashboard-compact' : ''}`}>
      <ClerkSidebar
        isMobileNavVisible={isMobileNavVisible}
        toggleMobileNav={toggleMobileNav}
      />
      <div className="dashboard-app">
        <Navbar toggleMobileNav={toggleMobileNav} />
        <ClerkContent />
      </div>
    </div>
  );
};

export default DashboardClerk;