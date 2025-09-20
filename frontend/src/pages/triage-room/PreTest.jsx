import React, { useState } from 'react';
import TriageRoomSidebar from '../../components/sidebar/TriageRoomSidebar';
import Navbar from '../../components/navbar/Navbar';
import PreTestForm from './PreTestForm';


const PreTest = () => {
  const [isMobileNavVisible, setMobileNavVisible] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavVisible(!isMobileNavVisible);
  };

  return (
    <div className={`dashboard ${isMobileNavVisible ? 'dashboard-compact' : ''}`}>
      <TriageRoomSidebar
        isMobileNavVisible={isMobileNavVisible}
        toggleMobileNav={toggleMobileNav}
      />
      <div className="dashboard-app">
        <Navbar toggleMobileNav={toggleMobileNav} />
        <PreTestForm />
      </div>
    </div>
  );
};

export default PreTest;