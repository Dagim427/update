import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "../../config/axiosConfig";
import "../styles/view.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";

function ViewEmployees() {
  const [isMobileNavVisible, setMobileNavVisible] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavVisible(!isMobileNavVisible);
  };

  // const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [resetSuccessMessage, setResetSuccessMessage] = useState("");
  const [deactivateMessage, setDeactivateMessage] = useState("");

  const handleDeactivateAccount = async (empId) => {
    try {
      const res = await axios.put(`/admin/employee/${empId}/deactivate`);
      setDeactivateMessage(res.data.message);
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.E_ID === empId ? { ...emp, status: "inactive" } : emp
        )
      );
      setTimeout(() => setDeactivateMessage(""), 5000);
    } catch (error) {
      console.error("Deactivate account error:", error);
      setDeactivateMessage("Error deactivating employee account");
      setTimeout(() => setDeactivateMessage(""), 5000);
    }
  };

  const handleResetPassword = async (empId) => {
    try {
      const res = await axios.put(`/admin/employee/${empId}/reset-password`);
      setResetSuccessMessage(res.data.message);
      setTimeout(() => setResetSuccessMessage(""), 5000);
    } catch (error) {
      console.error("Reset password error:", error);
      setResetSuccessMessage("Error resetting password");
      setTimeout(() => setResetSuccessMessage(""), 5000);
    }
  };

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const res = await axios.get("/admin/employees");
        setEmployees(res.data.employees || []);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    }
    fetchEmployees();
  }, []);

  return (
    <>
      <div
        className={`dashboard ${isMobileNavVisible ? "dashboard-compact" : ""}`}
      >
        <Sidebar
          isMobileNavVisible={isMobileNavVisible}
          toggleMobileNav={toggleMobileNav}
        />
        <div className="dashboard-app">
          <Navbar toggleMobileNav={toggleMobileNav} />
          <main>
            <div className="container">
              <h2 className="mt-4 fw-semibold text-color text-center border-bottom pb-2">
                All Employees
              </h2>
              <div className="d-flex justify-content-end mb-3">
                <Link
                  to="/admin/add-employee"
                  className="btn bg-button text-white text-decoration-none"
                  style={{ float: "right" }}
                >
                  <i className="bi bi-person-plus me-1"></i> Add Employees
                </Link>
              </div>
              <div className="table-responsive">
                {resetSuccessMessage && (
                  <div className="alert alert-success text-center">
                    {resetSuccessMessage}
                  </div>
                )}
                {deactivateMessage && (
                  <div className="alert alert-warning text-center">
                    {deactivateMessage}
                  </div>
                )}

                <table className="table table-striped table-bordered table-hover align-middle shadow-sm rounded text-center">
                  <thead className="table-primary text-center">
                    <tr>
                      <th>ID</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Role</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((emp) => (
                      <tr key={emp.E_ID}>
                        <td className="text-center">{emp.E_ID}</td>
                        <td className="text-center">{emp.First_name} </td>
                        <td className="text-center">{emp.Last_name}</td>
                        <td className="text-center">{emp.Role}</td>
                        <td className="text-center">{emp.Email}</td>
                        <td className="text-center">{emp.status}</td>

                        <td className="action-buttons d-flex">
                          <div className="d-flex gap-2">
                            <Link
                              to={`/admin/view-employee/${emp.E_ID}`}
                              className="btn btn-sm btn-info me-2"
                              title="View Employee Info"
                            >
                              <i className="bi bi-eye"></i>
                            </Link>
                            <Link
                              to={`/admin/edit-employee/${emp.E_ID}`}
                              className="btn btn-sm btn-warning me-2"
                              title="Edit Employee Info"
                            >
                              <i className="bi bi-pencil-square"></i>
                            </Link>

                            <button
                              className="btn btn-sm btn-danger me-2"
                              title="Reset Employee Password"
                              onClick={() => handleResetPassword(emp.E_ID)}
                            >
                              <i className="bi bi-arrow-clockwise"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-secondary me-2"
                              title="Deactivate Employee Account"
                              onClick={() => handleDeactivateAccount(emp.E_ID)}
                              
                            >
                              <i className="bi bi-person-dash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
export default ViewEmployees;
