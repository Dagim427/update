import React, { useState, useEffect } from "react";
import axios from "../../config/axiosConfig";
import { Link } from "react-router-dom";
import "../styles/view.css";

function EmployeeProfile({ role, dashboardPath }) {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`/${role}/profile`);
                setProfile(res.data.profile);
            } catch (err) {
                console.error("Failed to fetch profile:", err);
                setError("Failed to load profile data.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [role]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-danger">{error}</p>;
    if (!profile) return <p>No profile data available.</p>;

    // Format date of birth
    const formatDateOfBirth = (dob) => {
        if (!dob) return 'Not available';
        try {
            return new Date(dob).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (error) {
            return dob;
        }
    };

    // Get role display name
    const getRoleDisplayName = (role) => {
        const roleNames = {
            'admin': 'Administrator',
            'clerk': 'Clerk',
            'triage room': 'Triage Room Nurse',
            'lab technician': 'Lab Technician',
            'doctor': 'Doctor'
        };
        return roleNames[role] || role;
    };

    return (
        <div className="dashboard-content bg-light">
            <div className="d-flex justify-content-between align-items-center ps-3 mb-4">
                <h1 className="text-color mb-0">{getRoleDisplayName(role)} Profile</h1>
                <Link
                    to={dashboardPath}
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
                                <h3 className="mb-0">
                                    <i className="bi bi-person-circle me-2"></i>
                                    {getRoleDisplayName(role)} Profile
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
                                            <p className="form-control-plaintext">{profile.Sex}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label fw-bold text-color">
                                                <i className="bi bi-calendar me-2"></i>Date of Birth
                                            </label>
                                            <p className="form-control-plaintext">
                                                {formatDateOfBirth(profile.DoB)}
                                            </p>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label fw-bold text-color">
                                                <i className="bi bi-briefcase me-2"></i>Role
                                            </label>
                                            <p className="form-control-plaintext">
                                                <span className="badge bg-sidebar-body text-dark">
                                                    {getRoleDisplayName(profile.Role)}
                                                </span>
                                            </p>
                                        </div>
                                        {profile.doctorSpecialties && (
                                            <div className="mb-3">
                                                <label className="form-label fw-bold text-color">
                                                    <i className="bi bi-stethoscope me-2"></i>Specialty
                                                </label>
                                                <p className="form-control-plaintext">
                                                    <span className="badge bg-info text-dark">
                                                        {profile.doctorSpecialties}
                                                    </span>
                                                </p>
                                            </div>
                                        )}
                                        <div className="mb-3">
                                            <label className="form-label fw-bold text-color">
                                                <i className="bi bi-clock me-2"></i>Last Login
                                            </label>
                                            <p className="form-control-plaintext">
                                                {profile.formatted_last_login || "Never logged in"}
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

export default EmployeeProfile;
