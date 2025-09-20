import React from "react";
import EmployeeProfile from "../employee/EmployeeProfile";

function AdminProfile() {
    return <EmployeeProfile role="admin" dashboardPath="/admin" />;
}

export default AdminProfile;
