import React from "react";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import motite1 from "../../../assets/image/motite2.jpg"; // Make sure the image paths are correct
import motite2 from "../../../assets/image/motite3.jpg";
import { FaHospital, FaHeartbeat, FaShieldAlt } from "react-icons/fa"; // Icons for hospital, healthcare, and protection
import "./about-us.css";

function AboutUs() {
  return (
    <>
      <Header />
      <div className="container about-wrapper">
        <section className="row ">
          <div className="col-md-6">
            <img src={motite1} className="img-fluid rounded" alt="Hospital" />
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <h1 className="text-primary">About Motite Fura Primary Hospital</h1>
            <p>
              Motite Fura Primary Hospital is one of the leading healthcare providers in Sidama region. 
              Established as a Health Center in 2012 and upgraded to a Primary Hospital in 2014, 
              it serves the entire Hawassa city and surrounding communities, offering essential healthcare services.
            </p>
          </div>
        </section>

        <section className="row mt-5 values-section">
          <div className="col-md-4">
            <div className="service-card text-center">
              <FaHospital className="service-icon text-primary" />
              <h4>Quality Healthcare</h4>
              <p>We are committed to providing high-quality, compassionate healthcare services to all our patients.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="service-card text-center">
              <FaHeartbeat className="service-icon text-danger" />
              <h4>Patient-Centered Care</h4>
              <p>Our focus is on the well-being of patients, offering comprehensive care and personalized treatment plans.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="service-card text-center">
              <FaShieldAlt className="service-icon text-success" />
              <h4>Commitment to Safety</h4>
              <p>We ensure a safe, clean, and welcoming environment for all our patients and staff members.</p>
            </div>
          </div>
        </section>

        <section className="row history-section mt-5">
          <div className="col-md-12">
            <h3 className="text-primary">Our History</h3>
            <p>
              Motite Fura Primary Hospital began its journey as a Health Center in 2012, providing essential health services to the local community. 
              With continued growth and a dedicated medical team, the hospital achieved Primary Hospital status in 2014. Today, we serve a population of over 75,000 people, 
              offering emergency, outpatient, laboratory, pharmacy, and diagnostic services.
            </p>
          </div>
        </section>

        <section className="row mission-section mt-5">
          <div className="col-md-12">
            <h3 className="text-primary">Our Mission</h3>
            <p>
              Our mission is to provide accessible, high-quality, and compassionate healthcare to all individuals, regardless of their background. 
              We are dedicated to promoting health and well-being within our community, while striving for excellence in all aspects of healthcare delivery.
            </p>
          </div>
        </section>

        <section className="row mt-5">
          <div className="col-md-6">
            <img src={motite2} className="img-fluid rounded" alt="Hospital Facilities" />
          </div>
          <div className="col-md-6">
            <h3 className="text-primary">Our Facilities</h3>
            <p>
              The hospital is equipped with state-of-the-art medical equipment and facilities to deliver high-quality care. 
              From emergency services to specialized treatments, we are prepared to handle the healthcare needs of our community.
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default AboutUs;
