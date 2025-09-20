import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import PatientSidebar from '../sidebar/PatientSidebar';
import PatientContent from '../content/PatientContent';


const DashboardPatient = () => {
  const [isMobileNavVisible, setMobileNavVisible] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavVisible(!isMobileNavVisible);
  };

  return (
    <div className={`dashboard ${isMobileNavVisible ? 'dashboard-compact' : ''}`}>
      <PatientSidebar
        isMobileNavVisible={isMobileNavVisible}
        toggleMobileNav={toggleMobileNav}
      />
      <div className="dashboard-app">
        <Navbar toggleMobileNav={toggleMobileNav} />
        <PatientContent />
      </div>
    </div>
  );
};

export default DashboardPatient;