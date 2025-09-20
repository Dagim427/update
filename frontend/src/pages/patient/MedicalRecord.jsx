import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import PatientSidebar from '../../components/sidebar/PatientSidebar';
import MedicalRecordForm from './MedicalRecordForm';


const MedicalRecord = () => {
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
        <MedicalRecordForm />
      </div>
    </div>
  );
};

export default MedicalRecord;