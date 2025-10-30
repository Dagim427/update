import React, { useEffect, useMemo, useState, useRef } from "react";
import axios from "../../config/axiosConfig";
import LabRequestValueForm from "./LabRequestValueForm";

function SendLabResultForm() {
  const [patientList, setPatientList] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [labResults, setLabResults] = useState([]); // collect lab test results
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const selectedPatient = patientList.find((p) => p.patient_id == selectedId);

  const labTests = useMemo(() => {
    return selectedPatient?.lab_request
      ? selectedPatient.lab_request.split(",").map((test) => test.trim())
      : [];
  }, [selectedPatient]);

  const additonalNotesDom = useRef();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get("/lab-technician/get-doctor-patient");
        setPatientList(res.data.registered);
      } catch (error) {
        console.error("Failed to fetch patients:", error);
      }
    };
    fetchPatients();
  }, []);

  const handleLabResultsChange = (results) => {
    setLabResults(results); // update local state
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!selectedId || labResults.length === 0) {
      setErrorMessage("Select patient and enter lab results.");
      setTimeout(() => setErrorMessage(""), 4000);
      return;
    }

    const payload = {
      patientId: selectedId.trim(),
      labRequest: labResults
        .map(({ testName, result }) => `${testName} = ${result}`)
        .join(", "), // Convert to a single string 
      additonalNotes: additonalNotesDom.current.value,
    };

    try {
      await axios.post("/lab-technician/send-lab-result", payload);
      setSuccessMessage(true);
      setErrorMessage("");
      setTimeout(() => setSuccessMessage(false), 3000);
    } catch (error) {
      setErrorMessage("Submission failed. Try again.");
      console.log(error);
      setTimeout(() => setErrorMessage(""), 5000);
    }
  }

  return (
    <main>
      <div className="form-container">
        <h2 className="text-color fw-bold mb-4">Lab Result Form</h2>
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
                <div className="row mb-2">
                  <label className="col-sm-3 fw-bold">Patient ID:</label>
                  <div className="col-sm-9">{selectedPatient.patient_id}</div>
                </div>
                <div className="row mb-2">
                  <label className="col-sm-3 fw-bold">Patient MRN:</label>
                  <div className="col-sm-9">{selectedPatient.mrn}</div>
                </div>

                <div className="row mb-2">
                  <label className="col-sm-3 fw-bold">Patient Name:</label>
                  <div className="col-sm-9">
                    {selectedPatient.first_name} {selectedPatient.last_name}
                  </div>
                </div>

                <div className="row mb-2">
                  <label className="col-sm-3 fw-bold">Patient DoB:</label>
                  <div className="col-sm-9">{selectedPatient.dob}</div>
                </div>

                <div className="row mb-2">
                  <label className="col-sm-3 fw-bold">Sex:</label>
                  <div className="col-sm-9">{selectedPatient.sex}</div>
                </div>

                <div className="row mb-2">
                  <label className="col-sm-3 fw-bold">temperature:</label>
                  <div className="col-sm-9">{selectedPatient.temperature}</div>
                </div>

                <div className="row mb-2">
                  <label className="col-sm-3 fw-bold">weight:</label>
                  <div className="col-sm-9">{selectedPatient.weight}</div>
                </div>

                <div className="row mb-2">
                  <label className="col-sm-3 fw-bold">blood_pressure:</label>
                  <div className="col-sm-9">
                    {selectedPatient.blood_pressure}
                  </div>
                </div>

                <div className="row mb-2">
                  <label className="col-sm-3 fw-bold">pulse_rate:</label>
                  <div className="col-sm-9">{selectedPatient.pulse_rate}</div>
                </div>

                <div className="row mb-2">
                  <label className="col-sm-3 fw-bold">respiratory_rate:</label>
                  <div className="col-sm-9">
                    {selectedPatient.respiratory_rate}
                  </div>
                </div>

                <div className="row mb-2">
                  <label className="col-sm-3 fw-bold">
                    blood_glucose_level:
                  </label>
                  <div className="col-sm-9">
                    {selectedPatient.blood_glucose_level}
                  </div>
                </div>

                <div className="row mb-2">
                  <label className="col-sm-3 fw-bold">
                    HPI:
                  </label>
                  <div className="col-sm-9">
                    {selectedPatient.hpi}
                  </div>
                </div>

                <div className="row mb-2">
                  <label className="col-sm-3 fw-bold">
                    Physical exam:
                  </label>
                  <div className="col-sm-9">
                    {selectedPatient.physical_exam}
                  </div>
                </div>
                <div className="row mb-2">
                  <label className="col-sm-3 fw-bold">Lab Request:</label>
                  <div className="col-sm-9">{selectedPatient.lab_request}</div>
                </div>
              </div>
            )}
          </fieldset>
          {selectedPatient && (
            <fieldset className="border rounded-3 p-4 mb-4 shadow-sm bg-light">
              <legend className="w-auto px-3 text-primary fs-5 fw-semibold mb-3">
                Enter Lab Result
              </legend>
              <LabRequestValueForm
                labTest={labTests}
                onResultsChange={handleLabResultsChange}
              />
            </fieldset>
          )}
          <fieldset className="border rounded-3 p-4 mb-4 shadow-sm bg-light">
            <div className="mb-4">
              <label
                htmlFor="physicalExamFindings"
                className="form-label fw-bold"
              >
                Additional Notes
              </label>
              <textarea
                id="physicalExamFindings"
                className="form-control"
                rows="4"
                placeholder="Enter Additional Notes"
                ref={additonalNotesDom}
              ></textarea>
            </div>
          </fieldset>

          <hr />
          {/* Success Message */}
          {successMessage && (
            <div className="message success">Submitted Successfully!</div>
          )}
          {/* Error Message */}
          {errorMessage && <div className="message error">{errorMessage}</div>}
          <button type="submit" className="mt-4">
            Submit
          </button>
          <button type="reset">Reset</button>
        </form>
      </div>
    </main>
  );
}

export default SendLabResultForm;
