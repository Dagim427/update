import React, { useEffect, useState } from "react";
import axios from "../../config/axiosConfig"; // Make sure baseURL is set in this config

function PrescriptionReadForm() {
  const [prescriptions, setPrescriptions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const patientId = localStorage.getItem("patientID");

  useEffect(() => {
    if (!patientId) {
      setError("Patient ID not found. Please log in again.");
      setLoading(false);
      return;
    }

    const fetchPrescription = async () => {
      try {
        const res = await axios.get(`/patient/prescription-read/${patientId}`);
        if (res.data && res.data.length > 0) {
          setPrescriptions(res.data[0]);
        } else {
          setError("No prescription found.");
        }
      } catch (err) {
        console.error("Failed to fetch prescription:", err);
        setError("Failed to load prescription data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrescription();
  }, [patientId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!prescriptions) return <p>No prescription data available.</p>;

  let meds = [];
  try {
    meds = JSON.parse(prescriptions.medication || "[]");
  } catch (err) {
    console.warn("Failed to parse medications:", err);
    meds = [];
  }

  return (
    <main>
      <div className="form-container container mt-4">
        <h2 className="text-primary fw-bold mb-4">Patient Prescription</h2>
        <hr />
        <fieldset className="border rounded-3 p-4 mb-4 shadow-sm bg-light">
          <div className="mb-3">
            <div className="row mb-2">
              <label className="col-sm-3 fw-bold">Patient ID:</label>
              <div className="col-sm-9">{prescriptions.patient_id}</div>
            </div>
            <div className="row mb-2">
              <label className="col-sm-3 fw-bold">MRN:</label>
              <div className="col-sm-9">{prescriptions.mrn}</div>
            </div>
            <div className="row mb-2">
              <label className="col-sm-3 fw-bold">First Name:</label>
              <div className="col-sm-9">{prescriptions.first_name}</div>
            </div>
            <div className="row mb-2">
              <label className="col-sm-3 fw-bold">Last Name:</label>
              <div className="col-sm-9">{prescriptions.last_name}</div>
            </div>
            <div className="row mb-2">
              <label className="col-sm-3 fw-bold">Date of Birth:</label>
              <div className="col-sm-9">{prescriptions.dob}</div>
            </div>
            <div className="row mb-2">
              <label className="col-sm-3 fw-bold">Sex:</label>
              <div className="col-sm-9">{prescriptions.sex}</div>
            </div>
            <div className="row mb-2">
              <label className="col-sm-3 fw-bold">City:</label>
              <div className="col-sm-9">{prescriptions.city}</div>
            </div>
            <div className="row mb-2">
              <label className="col-sm-3 fw-bold">Phone Number:</label>
              <div className="col-sm-9">{prescriptions.phone_number}</div>
            </div>
            <div className="row mb-2">
              <label className="col-sm-3 fw-bold">Diagnosis:</label>
              <div className="col-sm-9">{prescriptions.diagnosis || "Not available"}</div>
            </div>
            <div className="row mb-2">
              <label className="col-sm-3 fw-bold">Prescribed By:</label>
              <div className="col-sm-9">
                {prescriptions.doctor_first_name && prescriptions.doctor_last_name ? (
                  <span className="badge bg-info text-dark">
                    Dr. {prescriptions.doctor_first_name} {prescriptions.doctor_last_name}
                    <span className="ms-2 text-muted">({prescriptions.doctor_specialty})</span>
                  </span>
                ) : prescriptions.department_specialty ? (
                  <span className="badge bg-warning text-dark">
                    <i className="bi bi-building me-2"></i>
                    {prescriptions.department_specialty} Department
                  </span>
                ) : (
                  <span className="text-muted">Department information not available</span>
                )}
              </div>
            </div>
            <div className="row mb-2">
              <label className="col-sm-3 fw-bold">Prescription Date:</label>
              <div className="col-sm-9">{prescriptions.prescription_date || "Not available"}</div>
            </div>
            <div className="row mb-2">
              <label className="col-sm-3 fw-bold">Advice:</label>
              <div className="col-sm-9">{prescriptions.advice || "Not available"}</div>
            </div>
            <div className="row mb-2">
              <label className="col-sm-3 fw-bold">Medications:</label>
              <div className="col-sm-9">
                {meds.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                      <thead className="table-primary">
                        <tr>
                          <th>#</th>
                          <th>Medicine</th>
                          <th>Dosage</th>
                          <th>Frequency</th>
                          <th>Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        {meds.map((med, index) => (
                          <tr key={index}>
                            <td className="text-center fw-bold">{index + 1}</td>
                            <td className="fw-semibold">{med.medicine}</td>
                            <td>{med.dosage}</td>
                            <td>{med.frequency}</td>
                            <td>{med.duration}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <span className="text-muted">No medications available.</span>
                )}
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    </main>
  );
}

export default PrescriptionReadForm;
