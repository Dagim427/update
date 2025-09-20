import React from "react";
import Card from "../dashboardCard/Cards";
import { Link } from "react-router-dom";
import ViewPatient from "../../assets/icons/clerk/view-patient.png";
import AddPatient from "../../assets/icons/clerk/patient.png";

const ClerkContent = () => {
  return (
    <div className="dashboard-content bg-light">
      <h1 className="ps-3 mb-4 text-color">Clerk Dashboard</h1>
      <div className="container">
        <Link  to="/clerk/view-patient-registeration"  className="text-decoration-none">
          <Card
            icon={ViewPatient}
            title="Patient"
            description="View all registered patients, including their details and registration information."
          />
        </Link>
        <Link
          to="/clerk/patient-registeration"
          className="text-decoration-none"
        >
          <Card
            icon={AddPatient}
            title="Add Patient"
            description="Register a new patient by entering their medical information"
          />
        </Link>
      </div>
    </div>
  );
};

export default ClerkContent;
