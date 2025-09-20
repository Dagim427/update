import React, { useRef, useEffect, useState } from "react";
import axios from "../../config/axiosConfig";
import LabTestsChecklist from "./LabTestsChecklist";

function DoctorEvalutionForm() {
  const [patientList, setPatientList] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedLabTests, setSelectedLabTests] = useState([]);

  const selectedPatient = patientList.find((p) => p.patient_id == selectedId);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get("/doctor/get-triage-patient");
        setPatientList(res.data.registered);
      } catch (error) {
        console.error("Failed to fetch patients:", error);
      }
    };
    fetchPatients();
  }, []);

  const handleLabTestsChange = (tests) => {
    setSelectedLabTests(tests);
  };

  const hpiDom = useRef();
  const physicalExamDom = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const DoctorEvalution = {
      patientId: selectedId.trim(),
      hpi: hpiDom.current.value,
      physicalExam: physicalExamDom.current.value,
      labRequest: selectedLabTests.join(", "),
    };

    try {
      await axios.post("/doctor/doctor-evaluation", DoctorEvalution);
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
        <h2 className="text-color fw-bold mb-4">Doctor Evaluation Form</h2>
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
                  <label className="col-sm-3 fw-bold">symptoms:</label>
                  <div className="col-sm-9">{selectedPatient.symptoms}</div>
                </div>

                <div className="row mb-2">
                  <label className="col-sm-3 fw-bold">
                    duration_of_symptoms:
                  </label>
                  <div className="col-sm-9">
                    {selectedPatient.duration_of_symptoms}
                  </div>
                </div>

                <div className="row mb-2">
                  <label className="col-sm-3 fw-bold">pain_scale:</label>
                  <div className="col-sm-9">{selectedPatient.pain_scale}</div>
                </div>

                <div className="row mb-2">
                  <label className="col-sm-3 fw-bold">allergies:</label>
                  <div className="col-sm-9">{selectedPatient.allergies}</div>
                </div>

                <div className="row mb-2">
                  <label className="col-sm-3 fw-bold">
                    Initial_observations:
                  </label>
                  <div className="col-sm-9">
                    {selectedPatient.Initial_observations}
                  </div>
                </div>
              </div>
            )}
          </fieldset>

          <fieldset className="border rounded-3 p-4 mb-4 shadow-sm bg-light">
            <legend className="w-auto px-3 text-primary fs-5 fw-semibold">
              Evaluation Form:
            </legend>

            <div className="mb-4">
              <label
                htmlFor="historyOfPresentIllness"
                className="form-label fw-bold"
              >
                History of Present Illness
              </label>
              <input
                type="text"
                id="historyOfPresentIllness"
                className="form-control"
                placeholder="Enter History of Present Illness"
                ref={hpiDom}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="physicalExamFindings"
                className="form-label fw-bold"
              >
                Physical Examination Findings
              </label>
              <textarea
                id="physicalExamFindings"
                className="form-control"
                rows="4"
                placeholder="Enter Physical Examination Findings"
                ref={physicalExamDom}
              ></textarea>
            </div>
          </fieldset>
          <fieldset className="border rounded-3 p-4 mb-4 shadow-sm bg-light">
            <legend className="w-auto px-3 text-primary fs-5 fw-semibold mb-3">
              Select Lab Tests
            </legend>
            <LabTestsChecklist onSelectionChange={handleLabTestsChange} />
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

export default DoctorEvalutionForm;
