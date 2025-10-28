import { useRef, useState, useEffect } from "react";
import axios from "../../../config/axiosConfig";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import "./login.css";

function Login() {
  const navigate = useNavigate();

  const [isPatientLogin, setIsPatientLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [responseMessage, setResponseMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const emailRef = useRef(null);
  const patientIdRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    if (isPatientLogin) {
      patientIdRef.current?.focus();
    } else {
      emailRef.current?.focus();
    }
  }, [isPatientLogin]);

  const validateEmployee = (email, password) => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email";
    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Minimum 6 characters";
    return newErrors;
  };

  const validatePatient = (id, password) => {
    const newErrors = {};
    if (!id.trim()) newErrors.patientId = "Patient ID is required";
    if (!password.trim()) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = passwordRef.current.value;

    if (isPatientLogin) {
      const patientId = patientIdRef.current.value;
      const validationErrors = validatePatient(patientId, password);
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length > 0) return;

      try {
        const { data } = await axios.post("/users/patient-login", {
          patientId,
          password,
        });

        const { token, patient_id, isFirstLogin } = data;

        localStorage.setItem("token", token);
        localStorage.setItem("patientID", patient_id);
        localStorage.setItem("role", "patient");

        setResponseMessage("Login successful!");
        setIsError(false);

        if (isFirstLogin) navigate("/patient-change-password");
        else navigate("/patient");
      } catch (error) {
        const msg = error.response?.data?.msg || "Something went wrong!";
        setResponseMessage(msg);
        setIsError(true);

        if (msg.toLowerCase().includes("not found")) {
          setErrors({ patientId: msg });
          patientIdRef.current.focus();
        } else if (msg.toLowerCase().includes("password")) {
          setErrors({ password: msg });
          passwordRef.current.focus();
        }

        setTimeout(() => setResponseMessage(""), 3000);
      }
    } else {
      const email = emailRef.current.value;
      const validationErrors = validateEmployee(email, password);
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length > 0) return;

      try {
        const { data } = await axios.post("/users/login", {
          email,
          password,
        });

        const { token, e_id, isFirstLogin, role, otpRequired } = data;

        localStorage.setItem("token", token);
        localStorage.setItem("employeeId", e_id);
        localStorage.setItem("role", role);

        setResponseMessage("Login successful!");
        setIsError(false);

        if (otpRequired) {
          navigate(`/verify-otp?e_id=${e_id}`);
        } else if (isFirstLogin) {
          navigate(`/change-password`);
        } else {
          switch (role) {
            case "admin":
              navigate("/admin");
              break;
            case "doctor":
              navigate("/doctor");
              break;
            case "lab technician":
              navigate("/lab-technician");
              break;
            case "clerk":
              navigate("/clerk");
              break;
            case "triage room":
              navigate("/triage-room");
              break;
            case "pharmacist":
              navigate("/pharmacist");
              break;
            default:
              navigate("/patient");
          }
        }
      } catch (error) {
        const msg = error.response?.data?.msg || "Something went wrong!";
        const otpRequired = error.response?.data?.otpRequired;
        const e_id = error.response?.data?.e_id;

        if (otpRequired && e_id) {
          navigate(`/verify-otp?e_id=${e_id}`);
          return;
        }

        setResponseMessage(msg);
        setIsError(true);

        if (msg === "Email not found") {
          setErrors({ email: msg });
          emailRef.current.focus();
        } else if (msg === "Incorrect password") {
          setErrors({ password: msg });
          passwordRef.current.focus();
        } else if (
          msg ===
          "Your account has been deactivated. Contact the administrator."
        ) {
          setResponseMessage(msg);
          setIsError(true);
        }

        setTimeout(() => setResponseMessage(""), 3000);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>{isPatientLogin ? "Patient Login" : "Employee Login"}</h2>

          {isPatientLogin ? (
            <input
              type="text"
              name="patientId"
              ref={patientIdRef}
              placeholder="Patient ID"
              className={`form-control ${errors.patientId ? "is-invalid" : ""}`}
            />
          ) : (
            <input
              type="email"
              name="email"
              ref={emailRef}
              placeholder="Email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
            />
          )}
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
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

          <div className="text-center mt-3">
            <button
              type="button"
              className="btn btn-link"
              onClick={() => setIsPatientLogin((prev) => !prev)}
            >
              {isPatientLogin
                ? "Switch to Employee Login"
                : "Switch to Patient Login"}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Login;
