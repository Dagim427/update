import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();
  const handleLogout = () => {

    localStorage.removeItem("token"); // 
    localStorage.removeItem("user"); // 
    navigate("/login");
  };
  return (
    <div>
      <button
        className="btn bg-button d-flex align-items-center gap-2"
        onClick={handleLogout}
      >
        <span>
          <i className="bi bi-box-arrow-right text-white pe-1"></i> Log out
        </span>
      </button>
    </div>
  );
}

export default Logout;
