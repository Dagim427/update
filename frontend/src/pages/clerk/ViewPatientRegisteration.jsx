import React, { useState, useEffect } from "react";
import "../styles/view.css";
import Navbar from "../../components/navbar/Navbar";
import ClerkSidebar from "../../components/sidebar/ClerkSidebar";
import axios from "../../config/axiosConfig";
import { Link } from "react-router-dom";
function ViewPatientRegisteration() {
  const [isMobileNavVisible, setMobileNavVisible] = useState(false);
  const [patients, setPatients] = useState([]);
  const [resetSuccessMessage, setResetSuccessMessage] = useState("");

  const toggleMobileNav = () => {
    setMobileNavVisible(!isMobileNavVisible);
  };
  const handleResetPassword = async (patientId) => {
    try {
      const res = await axios.put(`/clerk/patient/${patientId}/reset-password`);
      setResetSuccessMessage(res.data.message);
      setTimeout(() => setResetSuccessMessage(""), 5000);
    } catch (error) {
      console.error("Reset password error:", error);
      setResetSuccessMessage("Error resetting password");
      setTimeout(() => setResetSuccessMessage(""), 5000);
    }
  };

  useEffect(() => {
    async function fetchPatient() {
      try {
        const res = await axios.get(
          "/clerk/patient-Registeration/get-all-patients"
        );
        setPatients(res.data.patients || []);
      } catch (err) {
        console.error("error fetching patients:", err);
      }
    }
    fetchPatient();
  }, []);

  return (
    <>
      <div
        className={`dashboard ${isMobileNavVisible ? "dashboard-compact" : ""}`}
      >
        <ClerkSidebar
          isMobileNavVisible={isMobileNavVisible}
          toggleMobileNav={toggleMobileNav}
        />
        <div className="dashboard-app">
          <Navbar toggleMobileNav={toggleMobileNav} />
          <main>
            <div className="container">
              <h2 className="mt-4 fw-semibold text-color text-center border-bottom pb-2">
                All View Patient Registration
              </h2>

              <div className="d-flex justify-content-end mb-3">
                <Link
                  to="/clerk/patient-registeration"
                  className="btn bg-button text-white text-decoration-none"
                >
                  <i className="bi bi-person-plus me-1"></i> Add Patient
                </Link>
              </div>

              <div className="table-responsive">
                {resetSuccessMessage && (
                  <div className="alert alert-success text-center">
                    {resetSuccessMessage}
                  </div>
                )}
                <table className="table table-striped table-bordered table-hover align-middle shadow-sm rounded text-center">
                  <thead className="table-primary text-center">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">PID</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Sex</th>
                      <th scope="col">Phone Number</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map((patient, index) => (
                      <tr key={patient.patient_id}>
                        <td className="text-center">{index + 1}</td>
                        <td className="text-center">{patient.patient_id}</td>
                        <td className="text-center">{patient.first_name}</td>
                        <td className="text-center">{patient.last_name}</td>
                        <td className="text-center">{patient.sex}</td>
                        <td className="text-center">{patient.phone_number}</td>
                        <td>
                          <div className="d-flex justify-content-center gap-2 ">
                            <Link
                              to={`/clerk/view-patient/${patient.patient_id}`}
                              className="btn btn-sm btn-info me-2"
                              title="View patient Info"
                            >
                              <i className="bi bi-eye"></i>
                            </Link>
                            <Link
                              to={`/clerk/edit-patient/${patient.patient_id}`}
                              className="btn btn-sm btn-warning me-2"
                              title="Edit patient Info"
                            >
                              <i className="bi bi-pencil-square"></i>
                            </Link>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() =>
                                handleResetPassword(patient.patient_id)
                              }
                              title="Reset Password"
                            >
                              <i className="bi bi-arrow-clockwise"></i>
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
export default ViewPatientRegisteration;
