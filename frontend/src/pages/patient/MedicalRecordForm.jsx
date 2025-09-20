import React, { useEffect, useState } from "react";
import axios from "../../config/axiosConfig"; // Make sure baseURL is set in this config

function MedicalRecordForm() {
  const [medicalRecord, setMedicalRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const patientId = localStorage.getItem("patientID");

  useEffect(() => {
    if (!patientId) {
      setError("Patient ID not found. Please log in again.");
      setLoading(false);
      return;
    }

    const fetchMedicalRecord = async () => {
      try {
        const res = await axios.get(`/patient/medical-record/${patientId}`);
        if (res.data && res.data.length > 0) {
          setMedicalRecord(res.data[0]);
        } else {
          setError("No medical record found.");
        }
      } catch (err) {
        console.error("Failed to fetch medical record:", err);
        setError("Failed to load medical record data.");
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalRecord();
  }, [patientId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!medicalRecord) return <p>No medical record data available.</p>;

  let meds = [];
  try {
    meds = JSON.parse(medicalRecord.medication || "[]");
  } catch (err) {
    console.warn("Failed to parse medications:", err);
    meds = [];
  }

  // Format date of birth
  const formatDateOfBirth = (dob) => {
    if (!dob) return 'Not available';
    try {
      return new Date(dob).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return dob; // Return original if parsing fails
    }
  };

  return (
    <main>
      <div className="form-container container mt-4">
        <h2 className="text-primary fw-bold mb-4">Patient Medical record</h2>
        <hr />
        <fieldset className="border rounded-3 p-4 mb-4 shadow-sm bg-light">
          <legend className="w-auto px-3 text-primary fs-5 fw-semibold">
            Patient Information:
          </legend>
          <div className="mb-3">
            <div className="row mb-2">
              <label className="col-sm-3 fw-bold">Patient ID:</label>
              <div className="col-sm-9">{medicalRecord.patient_id}</div>
            </div>
            <div className="row mb-2">
              <label className="col-sm-3 fw-bold">MRN:</label>
              <div className="col-sm-9">{medicalRecord.mrn}</div>
            </div>
            <div className="row mb-2">
              <label className="col-sm-3 fw-bold">First Name:</label>
              <div className="col-sm-9">{medicalRecord.first_name}</div>
            </div>
            <div className="row mb-2">
              <label className="col-sm-3 fw-bold">Last Name:</label>
              <div className="col-sm-9">{medicalRecord.last_name}</div>
            </div>
            <div className="row mb-2">
              <label className="col-sm-3 fw-bold">Date of Birth:</label>
              <div className="col-sm-9">{formatDateOfBirth(medicalRecord.dob)}</div>
            </div>
            <div className="row mb-2">
              <label className="col-sm-3 fw-bold">Sex:</label>
              <div className="col-sm-9">{medicalRecord.sex}</div>
            </div>
            <div className="row mb-2">
              <label className="col-sm-3 fw-bold">City:</label>
              <div className="col-sm-9">{medicalRecord.city}</div>
            </div>
            <div className="row mb-2">
              <label className="col-sm-3 fw-bold">Phone Number:</label>
              <div className="col-sm-9">{medicalRecord.phone_number}</div>
            </div>
          </div>
        </fieldset>

        <fieldset className="border rounded-3 p-4 mb-4 shadow-sm bg-light">
          <legend className="w-auto px-3 text-primary fs-5 fw-semibold">
            Vital signs
          </legend>
          <div className="mb-3">
            <div className="row mb-2">
              <label className="col-sm-3 fw-bold">Temperature:</label>
              <div className="col-sm-9">{medicalRecord.temperature}</div>
            </div>
            <div className="row mb-2">
              <label className="col-sm-3 fw-bold">Weight:</label>
              <div className="col-sm-9">{medicalRecord.weight}</div>
            </div>
            <div className="row mb-2">
              <label className="col-sm-3 fw-bold">Blood pressure:</label>
              <div className="col-sm-9">{medicalRecord.blood_pressure}</div>
            </div>
            <div className="row mb-2">
              <label className="col-sm-3 fw-bold">Pulse rate:</label>
              <div className="col-sm-9">{medicalRecord.pulse_rate}</div>
            </div>
            <div className="row mb-2">
              <label className="col-sm-3 fw-bold">Respiratory rate:</label>
              <div className="col-sm-9">{medicalRecord.respiratoryrate}</div>
            </div>
            <div className="row mb-2">
              <label className="col-sm-3 fw-bold">Blood glucose level:</label>
              <div className="col-sm-9">
                {medicalRecord.blood_glucose_level}
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset className="border rounded-3 p-4 mb-4 shadow-sm bg-light">
          <legend className="w-auto px-3 text-primary fs-5 fw-semibold">
            Other Medical Information:
          </legend>
          <div className="mb-3">
            <div className="row mb-2">
              <label className="col-sm-3 fw-bold">Symptoms:</label>
              <div className="col-sm-9">{medicalRecord.symptoms}</div>
            </div>
            <div className="row mb-2">
              <label className="col-sm-3 fw-bold">Duration of symptoms:</label>
              <div className="col-sm-9">
                {medicalRecord.duration_of_symptoms}
              </div>
            </div>
            <div className="row mb-2">
              <label className="col-sm-3 fw-bold">Lab result:</label>
              <div className="col-sm-9">{medicalRecord.lab_result}</div>
            </div>
            <div className="row mb-2">
              <label className="col-sm-3 fw-bold">Diagnosis:</label>
              <div className="col-sm-9">{medicalRecord.diagnosis}</div>
            </div>
            <div className="row mb-2">
              <label className="col-sm-3 fw-bold">Prescribed By:</label>
              <div className="col-sm-9">
                {medicalRecord.doctor_first_name && medicalRecord.doctor_last_name ? (
                  <span className="badge bg-info text-dark">
                    Dr. {medicalRecord.doctor_first_name} {medicalRecord.doctor_last_name}
                    <span className="ms-2 text-muted">({medicalRecord.doctor_specialty})</span>
                  </span>
                ) : medicalRecord.department_specialty ? (
                  <span className="badge bg-warning text-dark">
                    <i className="bi bi-building me-2"></i>
                    {medicalRecord.department_specialty} Department
                  </span>
                ) : (
                  <span className="text-muted">Department information not available</span>
                )}
              </div>
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
                  <span className="text-muted">No prescription record available.</span>
                )}
              </div>
            </div>
            <div className="row mb-2">
              <label className="col-sm-3 fw-bold">advice:</label>
              <div className="col-sm-9">{medicalRecord.advice}</div>
            </div>
          </div>
        </fieldset>
      </div>
    </main>
  );
}

export default MedicalRecordForm;
