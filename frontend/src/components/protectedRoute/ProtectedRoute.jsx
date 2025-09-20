// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axiosConfig";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isAuthorized, setIsAuthorized] = useState(null); // null = loading, false = unauthorized

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axios.get("/users/check", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        const userRole = response.data?.role;

        if (allowedRoles && !allowedRoles.includes(userRole)) {
          navigate("/unauthorized");
        } else {
          setIsAuthorized(true);
        }
      } catch (error) {
        console.error("Access denied:", error.response?.data || error.message);
        navigate("/login");
      }
    };

    if (!token) {
      navigate("/login");
    } else {
      checkUser();
    }
  }, [navigate, token, allowedRoles]);

  if (isAuthorized === null) {
    return <div>Loading...</div>; // Show loading while verifying
  }

  return <>{children}</>;
};

export default ProtectedRoute;
