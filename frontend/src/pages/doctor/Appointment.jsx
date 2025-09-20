import React, { useState } from "react";
import DoctorSidebar from "../../components/sidebar/DoctorSidebar";
import Navbar from "../../components/navbar/Navbar";
import AppointmentForm from "../doctor/AppointmentForm";

const Appointment = () => {
  const [isMobileNavVisible, setMobileNavVisible] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavVisible(!isMobileNavVisible);
  };

  return (
    <div
      className={`dashboard ${isMobileNavVisible ? "dashboard-compact" : ""}`}
    >
      <DoctorSidebar
        isMobileNavVisible={isMobileNavVisible}
        toggleMobileNav={toggleMobileNav}
      />
      <div className="dashboard-app">
        <Navbar toggleMobileNav={toggleMobileNav} />
        <AppointmentForm />
      </div>
    </div>
  );
};

export default Appointment;
