import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import TriageRoomContent from '../content/TriageRoomContent';
import TriageRoomSidebar from '../sidebar/TriageRoomSidebar';


const DashboardTriageRoom = () => {
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
        <TriageRoomContent />
      </div>
    </div>
  );
};

export default DashboardTriageRoom;