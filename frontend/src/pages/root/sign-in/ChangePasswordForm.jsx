import React, { useState } from "react";
import axios from "../../../config/axiosConfig"; 
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import "./login.css";

function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match.");
      setError(true);
      return;
    }

    try {
      const response = await axios.post("/users/change-password", {
        currentPassword,
        newPassword,
      });

      setMessage(response.data.msg || "Password changed successfully.");
      setError(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setMessage(err.response?.data?.msg || "Error changing password.");
      setError(true);
    }
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <form className="login-form position-relative" onSubmit={handleSubmit}>
          <h2>Change Password</h2>

          {/* Current Password */}
          <div className="position-relative ">
            <input
              type={showPasswords.current ? "text" : "password"}
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="form-control pe-5"
              required
            />
            <button
              type="button"
              onClick={() =>
                setShowPasswords((prev) => ({
                  ...prev,
                  current: !prev.current,
                }))
              }
              className="btn position-absolute end-0 top-50 translate-middle-y me-2 border-0 bg-transparent"
              tabIndex={-1}
            >
              <i
                className={`bi ${
                  showPasswords.current ? "bi-eye-slash" : "bi-eye"
                }`}
              ></i>
            </button>
          </div>

          {/* New Password */}
          <div className="position-relative ">
            <input
              type={showPasswords.new ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control pe-5"
              required
            />
            <button
              type="button"
              onClick={() =>
                setShowPasswords((prev) => ({
                  ...prev,
                  new: !prev.new,
                }))
              }
              className="btn position-absolute end-0 top-50 translate-middle-y me-2 border-0 bg-transparent"
              tabIndex={-1}
            >
              <i
                className={`bi ${
                  showPasswords.new ? "bi-eye-slash" : "bi-eye"
                }`}
              ></i>
            </button>
          </div>

          {/* Confirm New Password */}
          <div className="position-relative mb-3">
            <input
              type={showPasswords.confirm ? "text" : "password"}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control pe-5"
              required
            />
            <button
              type="button"
              onClick={() =>
                setShowPasswords((prev) => ({
                  ...prev,
                  confirm: !prev.confirm,
                }))
              }
              className="btn position-absolute end-0 top-50 translate-middle-y me-2 border-0 bg-transparent"
              tabIndex={-1}
            >
              <i
                className={`bi ${
                  showPasswords.confirm ? "bi-eye-slash" : "bi-eye"
                }`}
              ></i>
            </button>
          </div>

          {message && (
            <div
              className={`alert ${error ? "alert-danger" : "alert-success"}`}
              role="alert"
            >
              {message}
            </div>
          )}

          <button type="submit" className="btn btn-primary w-100 mt-3">
            Change Password
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default ChangePasswordForm;
