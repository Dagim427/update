import React, { useRef, useState } from "react";
import axios from "../../config/axiosConfig";

function PatientRegisterationForm() {
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [patientId, setPatientId] = useState("");
  const [MRN, setMRN] = useState("");
  const [importStatus, setImportStatus] = useState("");

  const patientIdDom = useRef();
  const mrnDom = useRef();
  const firstNameDom = useRef();
  const lastNameDom = useRef();
  const dobDom = useRef();
  const sexDom = useRef();
  const emailDom = useRef();
  const cityDom = useRef();
  const phoneNumberDom = useRef();
  const fileInputRef = useRef();

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleGenerateId = async () => {
    try {
      const res = await axios.get(
        "/clerk/patient-Registeration/generate-patient-id"
      );
      setPatientId(res.data.patientId);
    } catch (error) {
      console.error("Error generating patient ID:", error);
      setErrorMessage("Failed to generate Patient ID. Please try again.");
    }
  };

  const handleGenerateMRN = async () => {
    try {
      const res = await axios.get("/clerk/patient-Registeration/generate-mrn");
      setMRN(res.data.MRN);
    } catch (error) {
      console.error("Error generating MRN:", error);
      setErrorMessage("Failed to generate MRN. Please try again.");
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const patientInfo = {
      patientId: patientIdDom.current.value,
      mrn: mrnDom.current.value,
      firstName: firstNameDom.current.value,
      lastName: lastNameDom.current.value,
      dob: dobDom.current.value,
      sex: sexDom.current.value,
      email: emailDom.current.value,
      city: cityDom.current.value,
      phoneNumber: phoneNumberDom.current.value,
    };

    try {
      await axios.post("/clerk/patient-Registeration", patientInfo);
      setSuccessMessage(true);
      setErrorMessage("");

      // Hide success after 3 seconds
      setTimeout(() => {
        setSuccessMessage(false);
      }, 3000);
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setErrorMessage("Patient already exists.");
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }

      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setImportStatus("Uploading...");
      await axios.post("/clerk/import-patients", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setImportStatus("Import Successfully!");
    } catch (error) {
      setImportStatus("Import failed.");
      console.error("Import error:", error);
    }
  };
  return (
    <>
      <main>
        <div className="form-container">
          <button
            className="btn btn-primary mb-3 d-flex align-items-center gap-2"
            onClick={handleImportClick}
            style={{ float: "right" }}
          >
            <i className="bi bi-upload"></i>
            Import
          </button>

          <input
            type="file"
            accept=".xlsx, .xls"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <h2 className="text-color fw-bold mb-4">Patient Registration</h2>
          <hr />
          <form onSubmit={handleSubmit}>
            <fieldset className="border rounded-3 p-4 mb-4 shadow-sm bg-light">
              <legend className="w-auto px-3 text-primary fs-5 fw-semibold ">
                patient Information
              </legend>

              <div className="mb-3">
                <label className="form-label fw-bold">Patient ID</label>
                <button
                  type="button"
                  onClick={handleGenerateId}
                  className="btn bg-button text-white"
                  style={{ float: "right" }}
                >
                  Generate Patient ID
                </button>
                {patientId && (
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Patient ID"
                    value={patientId}
                    ref={patientIdDom}
                    readOnly
                    required
                  />
                )}
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">
                  MRN - Medical Record Number{" "}
                </label>
                <button
                  type="button"
                  onClick={handleGenerateMRN}
                  className="btn bg-button text-white"
                  style={{ float: "right" }}
                >
                  Generate MRN
                </button>
                {MRN && (
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter MRN"
                    value={MRN}
                    ref={mrnDom}
                    readOnly
                    required
                  />
                )}
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">First Name:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter First name"
                  ref={firstNameDom}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Last Name:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Last Name"
                  ref={lastNameDom}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Date of Birth:</label>
                <input
                  ref={dobDom}
                  type="date"
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Sex:</label>
                <select ref={sexDom} className="form-select" required>
                  <option value="">Select...</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email (optional)"
                  ref={emailDom}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">City</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter City"
                  ref={cityDom}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Enter Phone Number"
                  ref={phoneNumberDom}
                  required
                />
              </div>
            </fieldset>
            <hr />
            {/* Success Message */}
            {successMessage && (
              <div className="message success">
                Patient Registered Successfully!
              </div>
            )}
            {/* Error Message */}
            {errorMessage && (
              <div className="message error">{errorMessage}</div>
            )}
            {importStatus && (
              <div className="message success">{importStatus}</div>
            )}

            <button type="submit">Register</button>
            <button type="reset">Reset</button>
          </form>
        </div>
      </main>
    </>
  );
}

export default PatientRegisterationForm;
