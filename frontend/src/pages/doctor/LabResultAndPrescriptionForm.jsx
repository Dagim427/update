import React, { useRef, useEffect, useState } from "react";
import axios from "../../config/axiosConfig";
import PrescriptionTable from "./PrescriptionTable";

function LabTestAndPrescriptionForm() {
  const [patientList, setPatientList] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [labResult, setLabResult] = useState("");
  const [isLoadingResult, setIsLoadingResult] = useState(false);
  const [medications, setMedications] = useState([
    { medicine: "", dosage: "", frequency: "", duration: "" },
  ]);

  const selectedPatient = patientList.find((p) => p.patient_id == selectedId);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get("/doctor/get-lab-patient");
        setPatientList(res.data.registered);
      } catch (error) {
        console.error("Failed to fetch patients:", error);
      }
    };
    fetchPatients();
  }, []);

  useEffect(() => {
    const fetchLabResult = async () => {
      if (!selectedId) return;

      setIsLoadingResult(true);
      try {
        const res = await axios.get(`/doctor/lab-result/${selectedId}`);
        setLabResult(res.data.labResult); // assuming string or array
      } catch (error) {
        console.error("Failed to fetch lab result:", error);
        setLabResult("Lab result not available.");
      } finally {
        setIsLoadingResult(false);
      }
    };
    fetchLabResult();
  }, [selectedId]);

  const diagnosisDom = useRef();
  const adviceDom = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    const Prescription = {
      patientId: selectedId.trim(),
      diagnosis: diagnosisDom.current.value,
      advice: adviceDom.current.value,
      medications: medications,
    };

    try {
      await axios.post(
        "/doctor/lab-result-and-prescripiton-form",
        Prescription
      );
      setSuccessMessage(true);
      setErrorMessage("");
      setTimeout(() => setSuccessMessage(false), 3000);
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
      console.log(error);
      setTimeout(() => setErrorMessage(""), 5000);
    }
  }

  return (
    <main>
      <div className="form-container">
        <h2 className="text-color fw-bold mb-4">
          Lab Result and Prescription Form
        </h2>
        <hr />
        <form onSubmit={handleSubmit}>
          <fieldset className="border rounded-3 p-4 mb-4 shadow-sm bg-light">
            <legend className="w-auto px-3 text-primary fs-5 fw-semibold">
              Patient Information:
            </legend>

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

            {selectedPatient && (
              <div className="mb-3">
                {[
                  ["Patient ID", selectedPatient.patient_id],
                  ["Patient MRN", selectedPatient.mrn],
                  [
                    "Patient Name",
                    `${selectedPatient.first_name} ${selectedPatient.last_name}`,
                  ],
                  ["Patient DoB", selectedPatient.dob],
                  ["Sex", selectedPatient.sex],
                  ["Temperature", selectedPatient.temperature],
                  ["Weight", selectedPatient.weight],
                  ["Blood Pressure", selectedPatient.blood_pressure],
                  ["Pulse Rate", selectedPatient.pulse_rate],
                  ["Respiratory Rate", selectedPatient.respiratory_rate],
                  ["Blood Glucose Level", selectedPatient.blood_glucose_level],
                  ["Symptoms", selectedPatient.symptoms],
                  [
                    "Duration of Symptoms",
                    selectedPatient.duration_of_symptoms,
                  ],
                  ["Pain Scale", selectedPatient.pain_scale],
                  ["Allergies", selectedPatient.allergies],
                  [
                    "Initial Observations",
                    selectedPatient.Initial_observations,
                  ],
                ].map(([label, value], index) => (
                  <div className="row mb-2" key={index}>
                    <label className="col-sm-3 fw-bold">{label}:</label>
                    <div className="col-sm-9">{value}</div>
                  </div>
                ))}
              </div>
            )}
          </fieldset>

          <fieldset className="border rounded-3 p-4 mb-5 shadow-sm bg-light">
            <legend className="w-auto px-3 text-primary fs-5 fw-semibold">
              Lab Test Result and Diagnosis
            </legend>

            <div className="mb-4">
              <label className="form-label fw-bold">Lab Test Result</label>
              <div className="border rounded p-2 bg-white">
                {isLoadingResult
                  ? "Loading..."
                  : labResult
                  ? Array.isArray(labResult)
                    ? labResult.map((item, i) => <div key={i}>{item}</div>)
                    : labResult
                        .split(",")
                        .map((item, i) => <div key={i}>{item.trim()}</div>)
                  : "No lab results available."}
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold">Diagnosis</label>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Enter diagnosis"
                ref={diagnosisDom}
              ></textarea>
            </div>
          </fieldset>

          <fieldset className="border rounded-3 p-4 mb-5 shadow-sm bg-light">
            <legend className="w-auto px-3 text-primary fs-5 fw-semibold">
              Prescription Form
            </legend>

            <div className="mb-4">
              <label className="form-label fw-bold">Medication</label>
              <PrescriptionTable rows={medications} setRows={setMedications} />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Advice</label>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Enter advice"
                ref={adviceDom}
              ></textarea>
            </div>
          </fieldset>
          <hr />
          {successMessage && (
            <div className="alert alert-success">Submitted Successfully!</div>
          )}
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}

          <button type="submit" className="btn btn-primary me-2">
            Submit
          </button>
          <button type="reset" className="btn btn-secondary">
            Reset
          </button>
        </form>
      </div>
    </main>
  );
}

export default LabTestAndPrescriptionForm;
