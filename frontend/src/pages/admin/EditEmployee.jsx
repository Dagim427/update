import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../config/axiosConfig";
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';

function EditEmployee() {
   const [isMobileNavVisible, setMobileNavVisible] = useState(false);
  
    const toggleMobileNav = () => {
      setMobileNavVisible(!isMobileNavVisible);
    };
  
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams(); // E_ID from URL
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    First_name: "",
    Last_name: "",
    Role: "",
    Email: "",
    status: "",
  });

  useEffect(() => {
    async function fetchEmployee() {
      try {
        const res = await axios.get(`/admin/employee/${id}`);
        setEmployee(res.data.employee);
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    }

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/admin/employee/${id}`, employee);
      setSuccessMessage(true);
      setErrorMessage("");

      setTimeout(() => {
        navigate("/admin/employees");
      }, 2000);
    } catch (error) {
      console.error("Error updating employee:", error);
      setErrorMessage("Failed to update employee");

      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  return (
    <>
        <div className={`dashboard ${isMobileNavVisible ? 'dashboard-compact' : ''}`}>
      <Sidebar
        isMobileNavVisible={isMobileNavVisible}
        toggleMobileNav={toggleMobileNav}
      />
      <div className="dashboard-app">
        <Navbar toggleMobileNav={toggleMobileNav} />
        <main>
        <div className="form-container">
          <h2 className="text-color fw-bold mb-4">Edit Employee</h2>
          <form onSubmit={handleSubmit}>
            <fieldset className="border rounded-3 p-4 mb-4 shadow-sm bg-light">
              <div className="row mb-2">
                <label className="col-sm-3 fw-bold">First Name</label>
                <div className="col-sm-9">
                  <input
                    name="First_name"
                    value={employee.First_name}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row mb-2">
                <label className="col-sm-3 fw-bold">Last Name</label>
                <div className="col-sm-9">
                  <input
                    name="Last_name"
                    value={employee.Last_name}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row mb-2">
                <label className="col-sm-3 fw-bold">Role</label>
                <div className="col-sm-9">
                  <select
                    name="Role"
                    value={employee.Role}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="doctor">Doctor</option>
                    <option value="clerk">Clerk</option>
                    <option value="admin">Admin</option>
                    <option value="lab technician">Lab Technician</option>
                    <option value="triage room">Triage Room</option>
                  </select>
                </div>
              </div>
              <div className="row mb-2">
                <label className="col-sm-3 fw-bold">Email</label>
                <div className="col-sm-9">
                  <input
                    name="Email"
                    value={employee.Email}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row mb-2">
                <label className="col-sm-3 fw-bold">Status</label>
                <div className="col-sm-9">
                  <select
                    name="status"
                    value={employee.status}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
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

export default EditEmployee;
