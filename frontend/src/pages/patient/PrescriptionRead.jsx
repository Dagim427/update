import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import PatientSidebar from '../../components/sidebar/PatientSidebar';
import PrescriptionReadForm from './PrescriptionReadForm';


const PatientRegisteration = () => {
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
        <PrescriptionReadForm />
      </div>
    </div>
  );
};

export default PatientRegisteration;