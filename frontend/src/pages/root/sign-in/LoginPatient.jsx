import { useRef, useState } from "react";
import axios from "../../../config/axiosConfig";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import "./login.css";

function LoginPatient() {
  const patientIdRef = useRef(null);
  const passwordRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [responseMessage, setResponseMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const patientId = patientIdRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    // Simple client-side validation
    const newErrors = {};
    if (!patientId) newErrors.patientId = "Patient ID is required.";
    if (!password) newErrors.password = "Password is required.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const response = await axios.post("/users/patient-login", {
        patientId,
        password,
      });

      const { token, patient_id, isFirstLogin } = response.data;

      if (!token || !patient_id) {
        throw new Error("Incomplete login response");
      }

      // Store session data
      localStorage.setItem("token", token);
      localStorage.setItem("patientID", patient_id);
      localStorage.setItem("role", "patient");

      setResponseMessage("Login successful!");
      setIsError(false);

      // Redirect based on first login
      if (isFirstLogin) {
        navigate("/patient-change-password");
      } else {
        navigate("/patient");
      }
    } catch (error) {
      const msg = error.response?.data?.msg || "Something went wrong!";
      setResponseMessage(msg);
      setIsError(true);

      // Set input-specific errors
      if (msg.toLowerCase().includes("not found")) {
        setErrors({ patientId: msg });
        patientIdRef.current.focus();
      } else if (msg.toLowerCase().includes("password")) {
        setErrors({ password: msg });
        passwordRef.current.focus();
      }

      setTimeout(() => setResponseMessage(""), 3000);
    }
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Patient Login</h2>

          <input
            type="text"
            name="patientId"
            ref={patientIdRef}
            placeholder="Patient ID"
            className={`form-control ${errors.patientId ? "is-invalid" : ""}`}
          />
          {errors.patientId && (
            <div className="invalid-feedback">{errors.patientId}</div>
          )}

          <div className="password-input-group position-relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              ref={passwordRef}
              placeholder="Password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="btn position-absolute end-0 top-50 translate-middle-y me-2 border-0 bg-transparent"
              tabIndex={-1}
            >
              <i
                className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
              ></i>
            </button>
          </div>
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}

          {responseMessage && (
            <div
              className={`alert mt-3 ${isError ? "alert-danger" : "alert-success"
                }`}
              role="alert"
            >
              {responseMessage}
            </div>
          )}

          <button type="submit" className="btn btn-primary w-100 mt-3">
            <i className="bi bi-box-arrow-in-right"></i> Log In
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default LoginPatient;
