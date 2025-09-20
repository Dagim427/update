import { React, useRef, useState } from "react";
import "../styles/added.css";
import axios from "../../config/axiosConfig";

function AddEmployeeForm() {
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [importStatus, setImportStatus] = useState("");
  const [selectedRole, setSelectedRole] = useState(""); // 👈 Added state for role

  const fileInputRef = useRef();
  const firstNameDom = useRef();
  const lastNameDom = useRef();
  const sexDom = useRef();
  const dobDom = useRef();
  const roleDom = useRef();
  const phoneNumberDom = useRef();
  const emailDom = useRef();
  const specialtyDom = useRef(); // 

  const doctorSpecialties = [
    "ENT Specialist",
    "Ophthalmologist",
    "Pediatrician",
    "Cardiologist",
    "Gastroenterologist",
    "Orthopedic doctor",
    "Neurologist",
    "Dermatologist",
  ];

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setImportStatus("Uploading...");
      await axios.post("/admin/import-employees", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setImportStatus("Import Successfully!");
    } catch (error) {
      setImportStatus("Import failed.");
      console.error("Import error:", error);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const firstNameValue = firstNameDom.current.value;
    const lastNameValue = lastNameDom.current.value;
    const sexValue = sexDom.current.value;
    const dobValue = dobDom.current.value;
    const roleValue = roleDom.current.value;
    const phoneNumberValue = phoneNumberDom.current.value;
    const emailValue = emailDom.current.value;
    const specialtyValue =
      roleValue === "doctor" ? specialtyDom.current.value : null;

    try {
      await axios.post("/admin/add-employee", {
        First_name: firstNameValue,
        Last_name: lastNameValue,
        Sex: sexValue,
        DoB: dobValue,
        Role: roleValue,
        Phone_number: phoneNumberValue,
        Email: emailValue,
        doctorSpecialties: specialtyValue, 
      });

      setSuccessMessage(true);
      setErrorMessage("");

      setTimeout(() => {
        setSuccessMessage(false);
      }, 3000);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage("Employee already exists.");
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }

      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  }

  return (
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

        <h2 className="text-color fw-bold mb-4">Add Employee Registration</h2>
        <hr />
        <form onSubmit={handleSubmit}>
          <fieldset className="border rounded-3 p-4 mb-4 shadow-sm bg-light">
            <legend className="w-auto px-3 text-primary fs-5 fw-semibold mb-3">
              Patient Information
            </legend>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="first-name" className="form-label fw-bold">
                  First Name
                </label>
                <input
                  ref={firstNameDom}
                  type="text"
                  id="first-name"
                  className="form-control"
                  placeholder="First Name"
                  required
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="last-name" className="form-label fw-bold">
                  Last Name
                </label>
                <input
                  ref={lastNameDom}
                  type="text"
                  id="last-name"
                  className="form-control"
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="sex" className="form-label fw-bold">
                  Sex
                </label>
                <select ref={sexDom} id="sex" className="form-select" required>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="col-md-6">
                <label htmlFor="dob" className="form-label fw-bold">
                  Date of Birth
                </label>
                <input
                  ref={dobDom}
                  type="date"
                  id="dob"
                  className="form-control"
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="role" className="form-label fw-bold">
                  Select Role
                </label>
                <select
                  id="role"
                  ref={roleDom}
                  className="form-select"
                  required
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <option value="">--Choose Role--</option>
                  <option value="admin">Admin</option>
                  <option value="doctor">Doctor</option>
                  <option value="clerk">Clerk</option>
                  <option value="lab technician">Lab Technician</option>
                  <option value="triage room">Triage Room</option>
                </select>
              </div>

              <div className="col-md-6">
                <label htmlFor="phone" className="form-label fw-bold">
                  Phone Number
                </label>
                <input
                  ref={phoneNumberDom}
                  type="tel"
                  id="phone"
                  className="form-control"
                  placeholder="Phone Number"
                  required
                />
              </div>
            </div>

            {/* Show doctor specialty if role is doctor */}
            {selectedRole === "doctor" && (
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="specialty" className="form-label fw-bold">
                    Select Specialty
                  </label>
                  <select
                    ref={specialtyDom}
                    id="specialty"
                    className="form-select"
                    required
                  >
                    <option value="">--Choose Specialty--</option>
                    {doctorSpecialties.map((spec, index) => (
                      <option key={index} value={spec}>
                        {spec}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-bold">
                Email
              </label>
              <input
                ref={emailDom}
                type="email"
                id="email"
                className="form-control"
                placeholder="Email"
                required
              />
            </div>
          </fieldset>

          {successMessage && (
            <div className="message success">Registered Successfully!</div>
          )}
          {errorMessage && <div className="message error">{errorMessage}</div>}
          {importStatus && (
            <div className="message success">{importStatus}</div>
          )}

          <button type="submit" className="btn btn-success me-2">
            Register
          </button>
          <button type="reset" className="btn btn-secondary">
            Reset
          </button>
        </form>
      </div>
    </main>
  );
}

export default AddEmployeeForm;
