import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../config/axiosConfig";
import LabSidebar from "../../components/sidebar/LabTechnicianSidebar";
import Navbar from "../../components/navbar/Navbar";

function ViewLabRequestById() {
  const [isMobileNavVisible, setMobileNavVisible] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavVisible(!isMobileNavVisible);
  };

  const { id } = useParams();

  const [patient, setPatient] = useState({
    patient_id: "",
    mrn: "",
    first_name: "",
    last_name: "",
    dob: "",
    sex: "",
    email: "",
    temperature: "",
    weight: "",
    blood_pressure: "",
    pulse_rate: "",
    respiratory_rate: "",
    blood_glucose_level: "",
    lab_request: "",
    lab_result: "",
    additional_notes: "",
  });

  useEffect(() => {
    async function fetchPatient() {
      try {
        const res = await axios.get(`/lab-technician/lab-request/${id}/view`);
        setPatient(res.data.patient);
      } catch (error) {
        console.error("Error fetching patient:", error);
      }
    }

    fetchPatient();
  }, [id]);

  return (
    <>
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
              <h2 className="text-color fw-bold mb-4">View patient</h2>
              <form>
                <fieldset className="border rounded-3 p-4 mb-4 shadow-sm bg-light">
                  <div className="row mb-2">
                    <label className="col-sm-3 fw-bold">Patient ID</label>
                    <div className="col-sm-9">{patient.patient_id}</div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 fw-bold">MRN </label>
                    <div className="col-sm-9">{patient.mrn}</div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 fw-bold">First Name</label>
                    <div className="col-sm-9">{patient.first_name}</div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 fw-bold">Last Name</label>
                    <div className="col-sm-9">{patient.last_name}</div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 fw-bold">dob</label>
                    <div className="col-sm-9">{patient.dob}</div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 fw-bold">Sex</label>
                    <div className="col-sm-9">{patient.sex}</div>
                  </div>

                  <div className="row mb-2">
                    <label className="col-sm-3 fw-bold">Temperature</label>
                    <div className="col-sm-9">{patient.temperature}</div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 fw-bold">Weight </label>
                    <div className="col-sm-9">{patient.weight}</div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 fw-bold">Blood pressure</label>
                    <div className="col-sm-9">{patient.blood_pressure}</div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 fw-bold">Pulse rate</label>
                    <div className="col-sm-9">{patient.pulse_rate}</div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 fw-bold">Respiratory rate</label>
                    <div className="col-sm-9">{patient.respiratory_rate}</div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 fw-bold">
                      Blood glucose level
                    </label>
                    <div className="col-sm-9">
                      {patient.blood_glucose_level}
                    </div>
                  </div>

                  <div className="row mb-2">
                    <label className="col-sm-3 fw-bold">Lab request</label>
                    <div className="col-sm-9">{patient.lab_request}</div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 fw-bold">Lab Result</label>
                    <div className="col-sm-9">{patient.lab_result}</div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 fw-bold">Additonal Notes</label>
                    <div className="col-sm-9">{patient.additional_notes}</div>
                  </div>
                </fieldset>
              </form>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default ViewLabRequestById;
