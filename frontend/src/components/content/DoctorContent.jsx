import React from "react";
import Card from "../dashboardCard/Cards";
import { Link } from "react-router-dom";
import Examination from "../../assets/icons/doctor/examination.png";
import Prescription from "../../assets/icons/doctor/prescription.png";

const DoctorContent = () => {
  return (
    <div className="dashboard-content bg-light">
      <h1 className="ps-3 mb-4 text-color">Doctor Dashboard</h1>
      <div className="container">
        <Link to="/doctor/doctor-evaluation" className="text-decoration-none">
          <Card
            icon={Examination}
            title="Doctor Evaluation"
            description="Fill out the evaluation form carefully with all required patient data."
          />
        </Link>
        <Link
          to="/doctor/lab-result-and-prescription"
          className="text-decoration-none"
        >
          <Card
            icon={Prescription}
            title="Lab Result and Prescription"
            description="Enter the lab test results and prescribe medications along with any advice for the patient."
          />
        </Link>
      </div>
    </div>
  );
};

export default DoctorContent;
