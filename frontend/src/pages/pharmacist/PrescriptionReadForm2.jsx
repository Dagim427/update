import React, { useEffect, useState } from "react";
import axios from "../../config/axiosConfig";

function PrescriptionReadForm() {
  const [patientList, setPatientList] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [parsedMedication, setParsedMedication] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Fetch patient list once
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get("/pharmacist/prescription-read");
        setPatientList(res.data.prescriptions || []);
      } catch (err) {
        console.error("Failed to fetch patients:", err);
        setError("Failed to load patient list.");
      }
    };
    fetchPatients();
  }, []);

  // ✅ Fetch prescription when a patient is selected
  useEffect(() => {
    if (!selectedId) {
      setSelectedPatient(null);
      setParsedMedication([]);
      return;
    }

    const fetchPrescription = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`/pharmacist/prescription-read/${selectedId}`);
        const patientData = res.data && res.data[0] ? res.data[0] : null;
        setSelectedPatient(patientData);

        // Parse medication safely
        if (patientData && patientData.medication) {
          try {
            const meds = JSON.parse(patientData.medication);
            setParsedMedication(meds);
          } catch (e) {
            console.warn("Failed to parse medication JSON:", e);
            setParsedMedication([]);
          }
        } else {
          setParsedMedication([]);
        }
      } catch (err) {
        console.error("Failed to fetch prescription:", err);
        setError("Failed to load prescription data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrescription();
  }, [selectedId]);

  // ✅ UI rendering
  if (loading) return <p>Loading prescription...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <main>
      <div className="form-container">
        <h2 className="text-primary fw-bold mb-4">Patient Prescription</h2>
        <hr />
        <fieldset className="border rounded-3 p-4 mb-4 shadow-sm bg-light">
          <legend className="w-auto px-3 text-primary fs-5 fw-semibold">
            Patient Information:
          </legend>

          {/* ✅ Patient selection dropdown */}
          <div className="mb-4">
            <label htmlFor="patientSelect" className="form-label fw-bold">
              Select Patient by ID:
            </label>
            <select
              id="patientSelect"
              className="form-select"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
            >
              <option value="">-- Select Patient --</option>
              {Array.isArray(patientList) &&
                patientList.map((p) => (
                  <option key={p.patient_id} value={p.patient_id}>
                    {p.patient_id} - {p.first_name} {p.last_name}
                  </option>
                ))}
            </select>
          </div>

          {/* ✅ Display patient details */}
          {selectedPatient && (
            <>
              <div className="row mb-2">
                <label className="col-sm-3 fw-bold">Patient ID:</label>
                <div className="col-sm-9">{selectedPatient.patient_id}</div>
              </div>
              <div className="row mb-2">
                <label className="col-sm-3 fw-bold">MRN:</label>
                <div className="col-sm-9">{selectedPatient.mrn}</div>
              </div>
              <div className="row mb-2">
                <label className="col-sm-3 fw-bold">Name:</label>
                <div className="col-sm-9">
                  {selectedPatient.first_name} {selectedPatient.last_name}
                </div>
              </div>
              <div className="row mb-2">
                <label className="col-sm-3 fw-bold">Date of Birth:</label>
                <div className="col-sm-9">{selectedPatient.dob}</div>
              </div>
              <div className="row mb-2">
                <label className="col-sm-3 fw-bold">Sex:</label>
                <div className="col-sm-9">{selectedPatient.sex}</div>
              </div>
              <div className="row mb-2">
                <label className="col-sm-3 fw-bold">City:</label>
                <div className="col-sm-9">{selectedPatient.city}</div>
              </div>
              <div className="row mb-2">
                <label className="col-sm-3 fw-bold">Phone Number:</label>
                <div className="col-sm-9">{selectedPatient.phone_number}</div>
              </div>
              <div className="row mb-2">
                <label className="col-sm-3 fw-bold">Diagnosis:</label>
                <div className="col-sm-9">{selectedPatient.diagnosis || "N/A"}</div>
              </div>
              <div className="row mb-2">
                <label className="col-sm-3 fw-bold">Advice:</label>
                <div className="col-sm-9">{selectedPatient.advice || "N/A"}</div>
              </div>

              {/* ✅ Medication table (like ViewLabResultAndPrescriptionById) */}
              <div className="row mb-2">
                <label className="col-sm-3 fw-bold">Medications:</label>
                <div className="col-sm-9">
                  {parsedMedication.length > 0 ? (
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
                          {parsedMedication.map((med, index) => (
                            <tr key={index}>
                              <td className="text-center fw-bold">{index + 1}</td>
                              <td>{med.medicine}</td>
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
            </>
          )}
        </fieldset>
      </div>
    </main>
  );
}

export default PrescriptionReadForm;
