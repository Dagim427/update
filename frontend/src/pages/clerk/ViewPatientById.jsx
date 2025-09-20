import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../config/axiosConfig";
import ClerkSidebar from "../../components/sidebar/ClerkSidebar";
import Navbar from "../../components/navbar/Navbar";

function ViewPatientById() {
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
    phone_number: ""
  });

  useEffect(() => {
    async function fetchPatient() {
      try {
        const res = await axios.get(`/clerk/patient/${id}/view`);
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
        <ClerkSidebar
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
                    <label className="col-sm-3 fw-bold">patient_id </label>
                    <div className="col-sm-9">{patient.patient_id}</div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 fw-bold">mrn </label>
                    <div className="col-sm-9">{patient.mrn}</div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 fw-bold">first_name</label>
                    <div className="col-sm-9">{patient.first_name}</div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 fw-bold">last_name</label>
                    <div className="col-sm-9">{patient.last_name}</div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 fw-bold">dob</label>
                    <div className="col-sm-9">{patient.dob}</div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 fw-bold">sex Number</label>
                    <div className="col-sm-9">{patient.sex}</div>
                  </div>
                   
                   <div className="row mb-2">
                    <label className="col-sm-3 fw-bold">city Number</label>
                    <div className="col-sm-9">{patient.city}</div>
                  </div>
                   <div className="row mb-2">
                    <label className="col-sm-3 fw-bold">Phone Number</label>
                    <div className="col-sm-9">{patient.phone_number}</div>
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

export default ViewPatientById;
