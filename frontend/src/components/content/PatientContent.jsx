import React from "react";
import Card from "../dashboardCard/Cards";
import { Link } from "react-router-dom";

import Prescription from "../../assets/icons/doctor/prescription.png";
import MedicalHistory from "../../assets/icons/medical-history.png";

const PatientContent = () => {
  return (
    <div className="dashboard-content bg-light">
      <h1 className="ps-3 mb-4 text-color">Patient Dashboard</h1>
      <div className="container">
        <Link to="/patient/prescription-read" className="text-decoration-none">
          <Card
            icon={Prescription}
            title="Prescription Read"
            description="Access and read prescriptions issued by your doctor."
          />
        </Link>

        <Link to='/patient/medical-record' className="text-decoration-none">
          <Card
            icon={MedicalHistory}
            title="Medical History"
            description="Review your complete medical history and past treatments."
          />
        </Link>
      </div>
    </div>
  );
};

export default PatientContent;
