import React, { useEffect, useState, useMemo } from "react";
import axios from "../../config/axiosConfig";
import LabRequestValueForm from "./LabRequestValueForm";
import { useParams, useNavigate } from "react-router-dom";
import LabSidebar from "../../components/sidebar/LabTechnicianSidebar";
import Navbar from "../../components/navbar/Navbar";

function EditSendLabResultById() {
  const [isMobileNavVisible, setMobileNavVisible] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavVisible(!isMobileNavVisible);
  };
  const [labResults, setLabResults] = useState([]); // collect lab test results
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const [patient, setPatient] = useState({
    lab_result: labResults
      .map(({ testName, result }) => `${testName} = ${result}`)
      .join(", "),
    additional_notes: "",
  });
  const labTests = useMemo(() => {
    return patient?.lab_request
      ? patient.lab_request.split(",").map((test) => test.trim())
      : [];
  }, [patient]);
  useEffect(() => {
    async function fetchPatient() {
      try {
        const res = await axios.get(`/lab-technician/lab-request/${id}`);
        setPatient(res.data.patient);
      } catch (error) {
        console.error("Error fetching patient:", error);
      }
    }

    fetchPatient();
  }, [id]);

  const handleLabResultsChange = (results) => {
    setLabResults(results); // update local state
  };

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const updatedLabResultString = labResults
    .map(({ testName, result }) => `${testName} = ${result}`)
    .join(", ");

  const updatedPatient = {
    ...patient,
    lab_result: updatedLabResultString,
  };

  try {
    await axios.put(`/lab-technician/lab-request/${id}/edit`, updatedPatient);
    setSuccessMessage(true);
    setErrorMessage("");

    setTimeout(() => {
      navigate("/lab-technician/view-lab-request");
    }, 2000);
  } catch (error) {
    console.error("Error updating patient:", error);
    setErrorMessage("Failed to update patient");

    setTimeout(() => {
      setErrorMessage("");
    }, 5000);
  }
};


  return (
    <div
      className={`dashboard ${isMobileNavVisible ? "dashboard-compact" : ""}`}
    >
      <LabSidebar
        isMobileNavVisible={isMobileNavVisible}
        toggleMobileNav={toggleMobileNav}
      />
      <div className="dashboard-app">
        <Navbar toggleMobileNav={toggleMobileNav} />
        <main>
          <div className="form-container">
            <h2 className="text-color fw-bold mb-4">Lab Result Form</h2>
            <hr />
            <form onSubmit={handleSubmit}>
              <fieldset className="border rounded-3 p-4 mb-4 shadow-sm bg-light">
                <legend className="w-auto px-3 text-primary fs-5 fw-semibold">
                  Patient Information:
                </legend>

                {patient && (
                  <div className="mb-3">
                    <div className="row mb-2">
                      <label className="col-sm-3 fw-bold">Patient ID:</label>
                      <div className="col-sm-9">{patient.patient_id}</div>
                    </div>
                    <div className="row mb-2">
                      <label className="col-sm-3 fw-bold">Patient MRN:</label>
                      <div className="col-sm-9">{patient.mrn}</div>
                    </div>

                    <div className="row mb-2">
                      <label className="col-sm-3 fw-bold">Patient Name:</label>
                      <div className="col-sm-9">
                        {patient.first_name} {patient.last_name}
                      </div>
                    </div>

                    <div className="row mb-2">
                      <label className="col-sm-3 fw-bold">Patient DoB:</label>
                      <div className="col-sm-9">{patient.dob}</div>
                    </div>

                    <div className="row mb-2">
                      <label className="col-sm-3 fw-bold">Sex:</label>
                      <div className="col-sm-9">{patient.sex}</div>
                    </div>

                    <div className="row mb-2">
                      <label className="col-sm-3 fw-bold">temperature:</label>
                      <div className="col-sm-9">{patient.temperature}</div>
                    </div>

                    <div className="row mb-2">
                      <label className="col-sm-3 fw-bold">weight:</label>
                      <div className="col-sm-9">{patient.weight}</div>
                    </div>

                    <div className="row mb-2">
                      <label className="col-sm-3 fw-bold">
                        blood_pressure:
                      </label>
                      <div className="col-sm-9">{patient.blood_pressure}</div>
                    </div>

                    <div className="row mb-2">
                      <label className="col-sm-3 fw-bold">pulse_rate:</label>
                      <div className="col-sm-9">{patient.pulse_rate}</div>
                    </div>

                    <div className="row mb-2">
                      <label className="col-sm-3 fw-bold">
                        respiratory_rate:
                      </label>
                      <div className="col-sm-9">{patient.respiratory_rate}</div>
                    </div>

                    <div className="row mb-2">
                      <label className="col-sm-3 fw-bold">
                        blood_glucose_level:
                      </label>
                      <div className="col-sm-9">
                        {patient.blood_glucose_level}
                      </div>
                    </div>

                    <div className="row mb-2">
                      <label className="col-sm-3 fw-bold">Lab Request:</label>
                      <div className="col-sm-9">{patient.lab_request}</div>
                    </div>
                  </div>
                )}
              </fieldset>
              {patient && (
                <fieldset className="border rounded-3 p-4 mb-4 shadow-sm bg-light">
                  <legend className="w-auto px-3 text-primary fs-5 fw-semibold mb-3">
                    Enter Lab Result
                  </legend>
                  <LabRequestValueForm
                    labTest={labTests}
                    onResultsChange={handleLabResultsChange}
                    name="lab_result"
                    value={patient.lab_result}
                    onChange={handleChange}
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
                    name="additional_notes"
                    value={patient.additional_notes}
                    onChange={handleChange}
                  ></textarea>
                </div>
                {successMessage && (
                  <div className="message success">Update Successfully!</div>
                )}
                {errorMessage && (
                  <div className="message error">{errorMessage}</div>
                )}
                <button className="btn btn-primary" type="submit">
                  Save Changes
                </button>
              </fieldset>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default EditSendLabResultById;
