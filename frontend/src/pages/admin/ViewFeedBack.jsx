import { useEffect, useState } from "react";
import axios from "../../config/axiosConfig";
import "../styles/view.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

function ViewFeedBack() {
  const [isMobileNavVisible, setMobileNavVisible] = useState(false);
  const [feedback, setFeedback] = useState([]);

  const toggleMobileNav = () => {
    setMobileNavVisible(!isMobileNavVisible);
  };

  useEffect(() => {
    async function fetchFeedback() {
      try {
        const res = await axios.get("/admin/view-feedback");
        setFeedback(res.data.feedback || []);
      } catch (err) {
        console.error("Error fetching feedback:", err);
      }
    }
    fetchFeedback();
  }, []);

  return (
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
          <div className="container">
            <h2 className="mt-4 fw-semibold text-color text-center border-bottom pb-2">
              All Feedback
            </h2>
            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover align-middle shadow-sm rounded text-center">
                <thead className="table-primary  className='text-center'text-center">
                  <tr>
                    <th>#</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th style={{ minWidth: "200px" }}>Message</th>
                  
                  </tr>
                </thead>
                <tbody>
                  {feedback.length > 0 ? (
                    feedback.map((item) => (
                      <tr key={item.ID}>
                        <td className="text-center">{item.ID}</td>
                        <td className="text-center">{item.FullName}</td>
                        <td className="text-center">{item.Email}</td>
                        <td
                          className="text-start text-wrap"
                          style={{ maxWidth: "300px" }}
                        >
                          {item.Message}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center text-muted">
                        No feedback available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ViewFeedBack;
