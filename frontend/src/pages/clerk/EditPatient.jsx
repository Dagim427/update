import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../config/axiosConfig";
import ClerkSidebar from '../../components/sidebar/ClerkSidebar';
import Navbar from '../../components/navbar/Navbar';

function EditPatient() {
   const [isMobileNavVisible, setMobileNavVisible] = useState(false);
  
    const toggleMobileNav = () => {
      setMobileNavVisible(!isMobileNavVisible);
    };
  
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams(); // E_ID from URL
  const navigate = useNavigate();
  const [patient, setPatient] = useState({
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
        const res = await axios.get(`/clerk/patient/${id}`);
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
      await axios.put(`/clerk/patient/${id}`, patient);
      setSuccessMessage(true);
      setErrorMessage("");

      setTimeout(() => {
        navigate("/clerk/view-patient-registeration");
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
        <div className={`dashboard ${isMobileNavVisible ? 'dashboard-compact' : ''}`}>
      <ClerkSidebar
        isMobileNavVisible={isMobileNavVisible}
        toggleMobileNav={toggleMobileNav}
      />
      <div className="dashboard-app">
        <Navbar toggleMobileNav={toggleMobileNav} />
        <main>
        <div className="form-container">
          <h2 className="text-color fw-bold mb-4">Edit patient</h2>
          <form onSubmit={handleSubmit}>
            <fieldset className="border rounded-3 p-4 mb-4 shadow-sm bg-light">
              <div className="row mb-2">
                <label className="col-sm-3 fw-bold">First Name</label>
                <div className="col-sm-9">
                  <input
                    name="first_name"
                    value={patient.first_name}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row mb-2">
                <label className="col-sm-3 fw-bold">Last Name</label>
                <div className="col-sm-9">
                  <input
                    name="last_name"
                    value={patient.last_name}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row mb-2">
                <label className="col-sm-3 fw-bold">Date of birth</label>
                <div className="col-sm-9">
                  <input
                  type="date"
                    name="dob"
                    value={patient.dob}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row mb-2">
                <label className="col-sm-3 fw-bold">Sex</label>
                <div className="col-sm-9">
                  <select
                    name="sex"
                    value={patient.sex}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    
                  </select>
                </div>
              </div>
              <div className="row mb-2">
                <label className="col-sm-3 fw-bold">Email</label>
                <div className="col-sm-9">
                  <input
                    name="email"
                    value={patient.email}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

                <div className="row mb-2">
                <label className="col-sm-3 fw-bold">City</label>
                <div className="col-sm-9">
                  <input
                    name="city"
                    value={patient.city}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

                <div className="row mb-2">
                <label className="col-sm-3 fw-bold">Phone number</label>
                <div className="col-sm-9">
                  <input
                    name="phone_number"
                    value={patient.phone_number}
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

export default EditPatient;
