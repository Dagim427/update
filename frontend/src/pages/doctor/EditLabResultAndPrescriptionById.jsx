import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../config/axiosConfig";
import DoctorSidebar from "../../components/sidebar/DoctorSidebar";
import Navbar from "../../components/navbar/Navbar";

function EditLabResultAndPrescriptionById() {
  const [isMobileNavVisible, setMobileNavVisible] = useState(false);
  const toggleMobileNav = () => setMobileNavVisible((v) => !v);

  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams(); // E_ID from URL
  const navigate = useNavigate();
  const [patient, setPatient] = useState({
    diagnosis: "",
    advice: "",
  });

  useEffect(() => {
    async function fetchPatient() {
      try {
        const res = await axios.get(
          `/doctor/lab-result-and-prescripiton/${id}`
        );
        setPatient(res.data.patient);
      } catch (error) {
        console.error("Error fetching patient:", error);
      }
    }

    fetchPatient();
  }, [id]);

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`doctor/lab-result-and-prescripiton/${id}/edit`, patient);
      setSuccessMessage(true);
      setErrorMessage("");

      setTimeout(() => {
        navigate("/doctor/view-lab-result-and-prescription");
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
      <DoctorSidebar
        isMobileNavVisible={isMobileNavVisible}
        toggleMobileNav={toggleMobileNav}
      />
      <div className="dashboard-app">
        <Navbar toggleMobileNav={toggleMobileNav} />
        <main>
          <div className="form-container">
            <h2 className="text-color fw-bold mb-4">
              Edit Doctor Diagnosis and advice
            </h2>
            <hr />
            <form onSubmit={handleSubmit}>
              <fieldset className="border rounded-3 p-4 mb-4 shadow-sm bg-light">
                <div className="mb-4">
                  <label
                    htmlFor="historyOfPresentIllness"
                    className="form-label fw-bold"
                  >
                    Patient ID
                  </label>
                  <div>{patient.patient_id}</div>
                </div>
                <div className="mb-4">
                  <label className="form-label fw-bold">Diagonsis</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Diagnosis"
                    name="diagnosis"
                    value={patient.diagnosis}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-bold">Advice</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Advice"
                    name="advice"
                    value={patient.advice}
                    onChange={handleChange}
                  />
                </div>
              </fieldset>

              <hr />

              {successMessage && (
                <div className="alert alert-success">Update Successfully!</div>
              )}
              {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
              )}

              <button className="btn btn-primary" type="submit">
                Save Changes
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default EditLabResultAndPrescriptionById;
