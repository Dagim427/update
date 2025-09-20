import { useState, useEffect } from "react";
import "../styles/view.css";
import Navbar from "../../components/navbar/Navbar";
import DoctorSidebar from "../../components/sidebar/DoctorSidebar";
import axios from "../../config/axiosConfig";
import { Link } from "react-router-dom";
function ViewLabAndPrescription() {
  const [isMobileNavVisible, setMobileNavVisible] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavVisible(!isMobileNavVisible);
  };
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    async function fetchPatient() {
      try {
        const res = await axios.get(
          "doctor/get-all-lab-result-and-prescription"
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
        <DoctorSidebar
          isMobileNavVisible={isMobileNavVisible}
          toggleMobileNav={toggleMobileNav}
        />
        <div className="dashboard-app">
          <Navbar toggleMobileNav={toggleMobileNav} />
          <main>
            <div className="container">
              <h2 className="mt-4 mb-4 fw-semibold text-color text-center border-bottom pb-2">
                All Doctor Lab Result And Prescription Patients
              </h2>

              <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover align-middle shadow-sm rounded text-center">
                  <thead className="table-primary text-center">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">PID</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">DoB</th>
                      <th scope="col">Sex</th>
                      <th scope="col">Diagnosis</th>
                      <th scope="col">Adivice</th>
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
                        <td className="text-center">{patient.dob}</td>
                        <td className="text-center">{patient.sex}</td>
                        <td className="text-center">{patient.diagnosis}</td>
                        <td className="text-center">{patient.advice}</td>
                        <td>
                          <div className="d-flex justify-content-center gap-2">
                            <Link
                              to={`/doctor/view-lab-result-and-prescription/${patient.patient_id}/view`}
                              className="btn btn-sm btn-info me-2"
                              title="View"
                            >
                              <i className="bi bi-eye"></i>
                            </Link>
                            <Link
                              to={`/doctor/edit-lab-result-and-prescription/${patient.patient_id}/edit`}
                              className="btn btn-sm btn-warning"
                              title="Edit"
                            >
                              <i className="bi bi-pencil-square"></i>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {patients.length === 0 && (
                      <tr>
                        <td colSpan="10" className="text-muted">
                          No patient evaluations found.
                        </td>
                      </tr>
                    )}
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
export default ViewLabAndPrescription;
