import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../config/axiosConfig";
import TriageSidebar from "../../components/sidebar/TriageRoomSidebar";
import Navbar from "../../components/navbar/Navbar";

function EditPreTest() {
  const [isMobileNavVisible, setMobileNavVisible] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavVisible(!isMobileNavVisible);
  };

  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams(); // E_ID from URL
  const navigate = useNavigate();
  const [patient, setPatient] = useState({
    temperature: "",
    weight: "",
    blood_pressure: "",
    pulse_rate: "",
    respiratory_rate: "",
    blood_glucose_level: "",
  });

  useEffect(() => {
    async function fetchPatient() {
      try {
        const res = await axios.get(`/triage-room/pre-test/${id}`);
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
      await axios.put(`/triage-room/pre-test/${id}/edit`, patient);
      setSuccessMessage(true);
      setErrorMessage("");

      setTimeout(() => {
        navigate("/triage-room/view-pre-test");
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
    <>
      <div
        className={`dashboard ${isMobileNavVisible ? "dashboard-compact" : ""}`}
      >
        <TriageSidebar
          isMobileNavVisible={isMobileNavVisible}
          toggleMobileNav={toggleMobileNav}
        />
        <div className="dashboard-app">
          <Navbar toggleMobileNav={toggleMobileNav} />
          <main>
            <div className="form-container">
              <h2 className="text-color fw-bold mb-4">Edit Pre test</h2>
              <form onSubmit={handleSubmit}>
                <fieldset className="border rounded-3 p-4 mb-4 shadow-sm bg-light">
                  <div className="row mb-2">
                    <label className="col-sm-3 fw-bold">Temperature </label>
                    <div className="col-sm-9">
                      <input
                        name="temperature"
                        value={patient.temperature}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 fw-bold">Weight</label>
                    <div className="col-sm-9">
                      <input
                        name="weight"
                        value={patient.weight}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 fw-bold">Blood pressure </label>
                    <div className="col-sm-9">
                      <input
                        name="blood_pressure"
                        value={patient.blood_pressure}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 fw-bold">Pulse rate</label>
                    <div className="col-sm-9">
                      <input
                        name="pulse_rate"
                        value={patient.pulse_rate}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 fw-bold">Respiratory rate</label>
                    <div className="col-sm-9">
                      <input
                        name="respiratory_rate"
                        value={patient.respiratory_rate}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="row mb-2">
                    <label className="col-sm-3 fw-bold">
                      Blood glucose level
                    </label>
                    <div className="col-sm-9">
                      <input
                        name="blood_glucose_level"
                        value={patient.blood_glucose_level}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
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
    </>
  );
}

export default EditPreTest;
