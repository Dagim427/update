import React from "react";
import Card from "../dashboardCard/Cards";
import { Link } from "react-router-dom";

import Prescription from "../../assets/icons/doctor/prescription.png";


const PharmacistContent = () => {
  return (
    <div className="dashboard-content bg-light">
      <h1 className="ps-3 mb-4 text-color">Pharmacist Dashboard</h1>
      <div className="container">
        <Link to="/pharmacist/prescription-read" className="text-decoration-none">
          <Card
            icon={Prescription}
            title="Prescription Read"
            description="Access and read prescriptions issued by your doctor."
          />
        </Link>

      </div>
    </div>
  );
};

export default PharmacistContent;
