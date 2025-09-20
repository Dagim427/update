import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../config/axiosConfig";
import TriageSidebar from "../../components/sidebar/TriageRoomSidebar";
import Navbar from "../../components/navbar/Navbar";

function ViewPreTestById() {
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
    city: "",
    phone_number: "",
    temperature: "",
    weight: "",
    blood_pressure: "",
    pulse_rate: "",
    respiratory_rate: "",
    blood_glucose_level: "",
    symptoms: "",
    duration_of_symptoms: "",
    pain_scale: "",
    level_of_consciousness: "",
    Priority_level: "",
    referred_to: "",
    allergies: "",
    Initial_observations: "",
  });

  useEffect(() => {
    async function fetchPatient() {
      try {
        const res = await axios.get(`/triage-room/pre-test/${id}/view`);
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
        <TriageSidebar
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
                    <label className="col-sm-3 fw-bold">City</label>
                    <div className="col-sm-9">{patient.city}</div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 fw-bold">Phone Number</label>
                    <div className="col-sm-9">{patient.phone_number}</div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 fw-bold">
                      Temperature
                    </label>
                    <div className="col-sm-9">{patient.temperature}</div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 fw-bold">Weight </label>
                    <div className="col-sm-9">{patient.weight}</div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 fw-bold">
                      Blood pressure 
                    </label>
                    <div className="col-sm-9">{patient.blood_pressure}</div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 fw-bold">
                      Pulse rate 
                    </label>
                    <div className="col-sm-9">{patient.pulse_rate}</div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 fw-bold">
                      Respiratory rate 
                    </label>
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
                    <label className="col-sm-3 fw-bold">Symptoms </label>
                    <div className="col-sm-9">{patient.symptoms}</div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 fw-bold">
                      Duration of symptoms 
                    </label>
                    <div className="col-sm-9">
                      {patient.duration_of_symptoms}
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 fw-bold">
                      Pain scale 
                    </label>
                    <div className="col-sm-9">{patient.pain_scale}</div>
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

export default ViewPreTestById;
