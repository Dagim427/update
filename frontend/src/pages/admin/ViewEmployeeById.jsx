import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../config/axiosConfig";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

function ViewEmployeeById() {
  const [isMobileNavVisible, setMobileNavVisible] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavVisible(!isMobileNavVisible);
  };

  const { id } = useParams(); // E_ID from URL

  const [employee, setEmployee] = useState({
    First_name: "",
    Last_name: "",
    Role: "",
    Email: "",
    status: "",
    Phone_number: "",
  });

  useEffect(() => {
    async function fetchEmployee() {
      try {
        const res = await axios.get(`/admin/employee/${id}/view`);
        setEmployee(res.data.employee);
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    }

    fetchEmployee();
  }, [id]);

 
  return (
    <>
      <div
        className={`dashboard ${isMobileNavVisible ? "dashboard-compact" : ""}`}
      >
        <Sidebar
          isMobileNavVisible={isMobileNavVisible}
          toggleMobileNav={toggleMobileNav}
        />
        <div className="dashboard-app">
          <Navbar toggleMobileNav={toggleMobileNav} />
          <main>
            <div className="form-container">
              <h2 className="text-color fw-bold mb-4">View Employee</h2>
              <form>
                <fieldset className="border rounded-3 p-4 mb-4 shadow-sm bg-light">
                  <div className="row mb-2">
                    <label className="col-sm-3 fw-bold">First Name</label>
                    <div className="col-sm-9">{employee.First_name}</div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 fw-bold">Last Name</label>
                    <div className="col-sm-9">{employee.Last_name}</div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 fw-bold">Role</label>
                    <div className="col-sm-9">{employee.Role}</div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 fw-bold">Email</label>
                    <div className="col-sm-9">{employee.Email}</div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 fw-bold">Status</label>
                    <div className="col-sm-9">{employee.status}</div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 fw-bold">Phone Number</label>
                    <div className="col-sm-9">{employee.Phone_number}</div>
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

export default ViewEmployeeById;
