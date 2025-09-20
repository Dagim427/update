import React from "react";
import Card from "../dashboardCard/Cards";
import { Link } from "react-router-dom";
import preTest from "../../assets/icons/triage-room/pre-test.png";
import viewPreTest from "../../assets/icons/triage-room/view-pre-test.png";

const TriageRoomContent = () => {
  return (
    <div className="dashboard-content bg-light">
      <h1 className="ps-3 mb-4 text-color">Triage Room Dashboard</h1>
      <div className="container">
        <Link to="/triage-room/view-pre-test" className="text-decoration-none">
          <Card
            icon={viewPreTest}
            title="Pre Test"
            description="View and manage pre-test assessments for patients, ensuring accurate and up-to-date information."
          />
        </Link>
        <Link to="/triage-room/pre-test" className="text-decoration-none">
          <Card
            icon={preTest}
            title="Add Pre Test"
            description="Conduct pre-test assessments for patients to gather essential information before their see doctor."
          />
        </Link>
      </div>
    </div>
  );
};

export default TriageRoomContent;
