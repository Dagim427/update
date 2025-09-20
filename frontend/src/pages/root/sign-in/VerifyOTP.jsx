import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "../../../config/axiosConfig";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";

function VerifyOtp() {
  const [searchParams] = useSearchParams();
  const e_id = searchParams.get("e_id");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/users/verify-otp", { e_id, otp });
      const { token, role, isFirstLogin } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("employeeId", e_id);

      setMessage("OTP verified successfully!");
      if (isFirstLogin) {
        navigate("/change-password");
      } else {
        navigate(`/${role}`);
      }
    } catch (err) {
      setMessage(err.response?.data?.msg || "Verification failed");
    }
  };

  return (
    <>
<Header />
    <div className="login-container">
      
      <form className="login-form"  onSubmit={handleVerify}>
        <h2>Verify OTP</h2>
        <input
          type="text"
          placeholder="Enter Email Verification Code"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          className="form-control mb-3"
        />
        <button type="submit" className="btn btn-primary">
          Verify OTP
        </button>
        {message && <p className="mt-2">{message}</p>}
      </form>
    </div>
    <Footer />
    </>
  );
}

export default VerifyOtp;
