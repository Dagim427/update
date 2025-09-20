import React from "react";
import Card from "../dashboardCard/Cards";
import { Link } from "react-router-dom";
import ViewLabRequest from "../../assets/icons/lab-technician/view-lab-result.png"
import SendLabRequest from "../../assets/icons/lab-technician/send-lab-result.png"

const LabTechnicianContent = () => {
  return (
    <div className="dashboard-content bg-light">
      <h1 className="ps-3 mb-4 text-color">Lab Technician Dashboard</h1>
      <div className="container">
        <Link to="/lab-technician/view-lab-request" className="text-decoration-none">
          <Card
            icon={ViewLabRequest}
            title="View Lab request"
            description="View all lab request, including their details and information"
          />
        </Link>
        <Link
          to="/lab-technician/send-lab-request"
          className="text-decoration-none"
        >
          <Card
            icon={SendLabRequest}
            title="Send Lab request"
            description="lab technician send lab result for doctor"
          />
        </Link>
      </div>
    </div>
  );
};

export default LabTechnicianContent;


