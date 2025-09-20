import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../config/axiosConfig";
import DoctorSidebar from "../../components/sidebar/DoctorSidebar";
import Navbar from "../../components/navbar/Navbar";

function ViewLabResultAndPrescriptionById() {
  const [isMobileNavVisible, setMobileNavVisible] = useState(false);
  const toggleMobileNav = () => setMobileNavVisible(!isMobileNavVisible);

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
    hpi: "",
    physical_exam: "",
    lab_request: "",
    diagnosis: "",
    medication: "",
    advice: ""
  });

  const [parsedMedication, setParsedMedication] = useState([]);

  useEffect(() => {
    async function fetchPatient() {
      try {
        const res = await axios.get(`/doctor/lab-result-and-prescripiton/${id}/view`);
        const fetchedPatient = res.data.patient;

        // Parse medication JSON if available
        if (fetchedPatient.medication) {
          try {
            const meds = JSON.parse(fetchedPatient.medication);
            setParsedMedication(meds);
          } catch (e) {
            console.warn("Failed to parse medication JSON:", e);
            setParsedMedication([]);
          }
        }

        setPatient(fetchedPatient);
      } catch (error) {
        console.error("Error fetching patient:", error);
      }
    }

    fetchPatient();
  }, [id]);

  return (
    <div className={`dashboard ${isMobileNavVisible ? "dashboard-compact" : ""}`}>
      <DoctorSidebar
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
                <div className="row mb-2"><label className="col-sm-3 fw-bold">Patient ID</label><div className="col-sm-9">{patient.patient_id}</div></div>
                <div className="row mb-2"><label className="col-sm-3 fw-bold">MRN</label><div className="col-sm-9">{patient.mrn}</div></div>
                <div className="row mb-2"><label className="col-sm-3 fw-bold">First Name</label><div className="col-sm-9">{patient.first_name}</div></div>
                <div className="row mb-2"><label className="col-sm-3 fw-bold">Last Name</label><div className="col-sm-9">{patient.last_name}</div></div>
                <div className="row mb-2"><label className="col-sm-3 fw-bold">DOB</label><div className="col-sm-9">{patient.dob}</div></div>
                <div className="row mb-2"><label className="col-sm-3 fw-bold">Sex</label><div className="col-sm-9">{patient.sex}</div></div>
                <div className="row mb-2"><label className="col-sm-3 fw-bold">City</label><div className="col-sm-9">{patient.city}</div></div>
                <div className="row mb-2"><label className="col-sm-3 fw-bold">Phone Number</label><div className="col-sm-9">{patient.phone_number}</div></div>
                <div className="row mb-2"><label className="col-sm-3 fw-bold">Temperature</label><div className="col-sm-9">{patient.temperature}</div></div>
                <div className="row mb-2"><label className="col-sm-3 fw-bold">Weight</label><div className="col-sm-9">{patient.weight}</div></div>
                <div className="row mb-2"><label className="col-sm-3 fw-bold">Blood Pressure</label><div className="col-sm-9">{patient.blood_pressure}</div></div>
                <div className="row mb-2"><label className="col-sm-3 fw-bold">Pulse Rate</label><div className="col-sm-9">{patient.pulse_rate}</div></div>
                <div className="row mb-2"><label className="col-sm-3 fw-bold">Respiratory Rate</label><div className="col-sm-9">{patient.respiratory_rate}</div></div>
                <div className="row mb-2"><label className="col-sm-3 fw-bold">Blood Glucose Level</label><div className="col-sm-9">{patient.blood_glucose_level}</div></div>
                <div className="row mb-2"><label className="col-sm-3 fw-bold">Symptoms</label><div className="col-sm-9">{patient.symptoms}</div></div>
                <div className="row mb-2"><label className="col-sm-3 fw-bold">Duration of Symptoms</label><div className="col-sm-9">{patient.duration_of_symptoms}</div></div>
                <div className="row mb-2"><label className="col-sm-3 fw-bold">Pain Scale</label><div className="col-sm-9">{patient.pain_scale}</div></div>
                <div className="row mb-2"><label className="col-sm-3 fw-bold">HPI</label><div className="col-sm-9">{patient.hpi}</div></div>
                <div className="row mb-2"><label className="col-sm-3 fw-bold">Physical Exam</label><div className="col-sm-9">{patient.physical_exam}</div></div>
                <div className="row mb-2"><label className="col-sm-3 fw-bold">Lab Request</label><div className="col-sm-9">{patient.lab_request}</div></div>
                <div className="row mb-2"><label className="col-sm-3 fw-bold">Diagnosis</label><div className="col-sm-9">{patient.diagnosis}</div></div>
                
                <div className="row mb-2">
                  <label className="col-sm-3 fw-bold">Medication</label>
                  <div className="col-sm-9">
                    {parsedMedication.length > 0 ? (
                      parsedMedication.map((med, index) => (
                        <div key={index} className="mb-2">
                          <div><strong>Medicine:</strong> {med.medicine}</div>
                          <div><strong>Dosage:</strong> {med.dosage}</div>
                          <div><strong>Frequency:</strong> {med.frequency}</div>
                          <div><strong>Duration:</strong> {med.duration}</div>
                          <hr />
                        </div>
                      ))
                    ) : (
                      <span>No medication information</span>
                    )}
                  </div>
                </div>

                <div className="row mb-2"><label className="col-sm-3 fw-bold">Advice</label><div className="col-sm-9">{patient.advice}</div></div>
              </fieldset>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ViewLabResultAndPrescriptionById;
