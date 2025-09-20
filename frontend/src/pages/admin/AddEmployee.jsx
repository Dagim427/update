import React, { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import AddEmployeeForm from './AddEmployeeForm';


const AddEmployee = () => {
  const [isMobileNavVisible, setMobileNavVisible] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavVisible(!isMobileNavVisible);
  };

  return (
    <div className={`dashboard ${isMobileNavVisible ? 'dashboard-compact' : ''}`}>
      <Sidebar
        isMobileNavVisible={isMobileNavVisible}
        toggleMobileNav={toggleMobileNav}
      />
      <div className="dashboard-app">
        <Navbar toggleMobileNav={toggleMobileNav} />
        <AddEmployeeForm />
      </div>
    </div>
  );
};

export default AddEmployee;