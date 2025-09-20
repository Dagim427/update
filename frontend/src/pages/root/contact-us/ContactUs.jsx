import React, { useState } from "react";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import "./contact.css";
import axios from "../../../config/axiosConfig";

function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [responseMessage, setResponseMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setResponseMessage("");
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid Email";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post("/home/contact-msg", formData);
        if (response.status === 201) {
          setResponseMessage("Message sent successfully!");
          setIsError(false);
          setFormData({ fullName: "", email: "", message: "" });

          setTimeout(() => {
            setResponseMessage("");
          }, 5000);
        }
      } catch (error) {
        console.error("Error sending message:", error);
        setResponseMessage("Failed to send message. Please try again.");
        setIsError(true);

        setTimeout(() => {
          setResponseMessage("");
        }, 5000);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="container py-5 contact-wrapper">
        <h2 className="text-center mb-5 fw-bold text-primary">Get In Touch</h2>
        <div className="row g-4 align-items-stretch">
          {/* Contact Info and Map */}
          <div className="col-lg-5">
            <div className="info-card p-4 shadow-sm rounded bg-white h-100">
              <h4 className="mb-3 text-primary">Contact Information</h4>
              <p>
                <i className="bi bi-geo-alt-fill me-2 text-danger"></i>
                Motite Fura Primary Hospital, Hawassa
              </p>
              <p>
                <i className="bi bi-telephone-fill me-2 text-success"></i>
                +251-916-580913
              </p>
              <p>
                <i className="bi bi-envelope-fill me-2 text-warning"></i>
                info@motitehospital.et
              </p>
              <div className="map-container mt-4">
                <iframe
                  title="Google Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.5711864495274!2d38.481623899999995!3d7.0595649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17b145832275e761%3A0x467851bf380ffb56!2sD.%20Motite%20Fura%20Primary%20Hospital!5e0!3m2!1sen!2set!4v1746297774644!5m2!1sen!2set"
                  width="100%"
                  height="200"
                  style={{ border: 0, borderRadius: "10px" }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-7">
            <div className="form-card p-4 shadow-sm rounded bg-light h-100">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Full Name</label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.fullName ? "is-invalid" : ""
                    }`}
                    placeholder="Enter your name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  {errors.fullName && (
                    <div className="invalid-feedback">{errors.fullName}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    placeholder="Enter your email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="mb-4">
                  <label className="form-label fw-semibold">Message</label>
                  <textarea
                    className={`form-control ${
                      errors.message ? "is-invalid" : ""
                    }`}
                    rows="5"
                    placeholder="Write your message here..."
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                  {errors.message && (
                    <div className="invalid-feedback">{errors.message}</div>
                  )}
                </div>

                {/* Bootstrap Alert for Feedback */}
                {responseMessage && (
                  <div
                    className={`alert ${
                      isError ? "alert-danger" : "alert-success"
                    }`}
                    role="alert"
                  >
                    {responseMessage}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary w-100 fw-bold shadow-sm"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
