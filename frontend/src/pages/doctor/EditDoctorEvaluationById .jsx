import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../config/axiosConfig";
import DoctorSidebar from "../../components/sidebar/DoctorSidebar";
import Navbar from "../../components/navbar/Navbar";

function EditDoctorEvaluationById() {
  const [isMobileNavVisible, setMobileNavVisible] = useState(false);
  const toggleMobileNav = () => setMobileNavVisible((v) => !v);

  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams(); // E_ID from URL
  const navigate = useNavigate();
  const [patient, setPatient] = useState({
    hpi: "",
    physical_exam: "",
  });

  useEffect(() => {
    async function fetchPatient() {
      try {
        const res = await axios.get(`/doctor/doctor-evaluation/${id}`);
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
      await axios.put(`/doctor/doctor-evaluation/${id}/edit`, patient);
      setSuccessMessage(true);
      setErrorMessage("");

      setTimeout(() => {
        navigate("/doctor/view-doctor-evaluation");
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
            <h2 className="text-color fw-bold mb-4">Doctor Evaluation Form</h2>
            <hr />
            <form onSubmit={handleSubmit}>
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
                    name="hpi"
                    value={patient.hpi}
                    onChange={handleChange}
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
                    name="physical_exam"
                    value={patient.physical_exam}
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

export default EditDoctorEvaluationById;
