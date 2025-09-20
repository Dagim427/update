import React from "react";
import Card from "../dashboardCard/Cards";
import { Link } from "react-router-dom";
import Employee from "../../assets/icons/admin/employee.png";
import AddEmployee from "../../assets/icons/admin/add-employee.png";
import Feedback from "../../assets/icons/admin/feedback.png";

const Content = () => {
  return (
    <div className="dashboard-content bg-light">
      <h1 className="ps-3 mb-4 text-color">Admin Dashboard</h1>
      <div className="container">
        <Link to="/admin/employees" className="text-decoration-none">
          <Card
            icon={Employee}
            title="Employee"
            description="View and manage all hospital staff, including doctors, nurses, lab technicians, and clerks. Quickly access employee details and roles."
          />
        </Link>
        <Link to="/admin/add-employee" className="text-decoration-none">
          <Card
            icon={AddEmployee}
            title="Add Employee"
            description="Add new employees to the system by filling out their role, department, contact details, and login credentials for system access."
          />
        </Link>
        <Link to="/admin/view-feedback" className="text-decoration-none">
          <Card
            icon={Feedback}
            title="View Feedback"
            description="Access and review feedback or messages from patients and staff to monitor concerns, improve services, and respond to inquiries."
          />
        </Link>
      </div>
    </div>
  );
};

export default Content;
