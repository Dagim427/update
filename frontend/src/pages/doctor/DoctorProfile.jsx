import React, { useState, useEffect } from "react";
import axios from "../../config/axiosConfig";
import { Link } from "react-router-dom";
import "../styles/view.css";

function DoctorProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/doctor/profile");
        setProfile(response.data.profile);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to load profile");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning" role="alert">
          No profile data available
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-content bg-light">
      <div className="d-flex justify-content-between align-items-center ps-3 mb-4">
        <Link
          to="/doctor"
          className="btn"
          style={{
            textDecoration: 'none',
            backgroundColor: '#1f4e78',
            color: 'white',
            border: '2px solid #1f4e78',
            fontWeight: 'bold',
            padding: '8px 16px',
            borderRadius: '5px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <i className="bi bi-arrow-left me-2"></i>
          Back to Dashboard
        </Link>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow">
              <div className="card-header bg-sidebar-header text-white">
                <h3 className="text-color mb-0">
                  <i className="bi bi-person-circle me-2"></i>
                  Doctor Profile
                </h3>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label fw-bold text-color">
                        <i className="bi bi-person me-2"></i>Full Name
                      </label>
                      <p className="form-control-plaintext">
                        {profile.First_name} {profile.Last_name}
                      </p>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold text-color">
                        <i className="bi bi-envelope me-2"></i>Email
                      </label>
                      <p className="form-control-plaintext">{profile.Email}</p>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold text-color">
                        <i className="bi bi-telephone me-2"></i>Phone Number
                      </label>
                      <p className="form-control-plaintext">{profile.Phone_number}</p>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold text-color">
                        <i className="bi bi-gender-ambiguous me-2"></i>Gender
                      </label>
                      <p className="form-control-plaintext">
                        {profile.Sex ? profile.Sex.charAt(0).toUpperCase() + profile.Sex.slice(1) : "Not specified"}
                      </p>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label fw-bold text-color">
                        <i className="bi bi-calendar me-2"></i>Date of Birth
                      </label>
                      <p className="form-control-plaintext">
                        {profile.DoB ? new Date(profile.DoB).toLocaleDateString() : "Not specified"}
                      </p>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold text-color">
                        <i className="bi bi-award me-2"></i>Specialty
                      </label>
                      <p className="form-control-plaintext">
                        {profile.doctorSpecialties || "Not specified"}
                      </p>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold text-color">
                        <i className="bi bi-clock me-2"></i>Last Login
                      </label>
                      <p className="form-control-plaintext">
                        {profile.formatted_last_login || "Never logged in"}
                      </p>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold text-color">
                        <i className="bi bi-shield-check me-2"></i>Role
                      </label>
                      <p className="form-control-plaintext">
                        <span className="badge bg-sidebar-body">
                          {profile.Role ? profile.Role.charAt(0).toUpperCase() + profile.Role.slice(1) : "Doctor"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile;
