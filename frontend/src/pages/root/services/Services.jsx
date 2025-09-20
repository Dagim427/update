import React from "react";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import "./services.css";

const services = [
  { name: "Emergency Service", icon: "bi bi-exclamation-triangle-fill" },
  { name: "Vaccine Service", icon: "bi bi-syringe" },
  { name: "Family Planning Service", icon: "bi bi-people-fill" },
  { name: "TB Diagnosis and Treatment", icon: "bi bi-lungs-fill" },
  { name: "HIV/AIDS Diagnosis and Treatment", icon: "bi bi-heart-pulse-fill" },
  { name: "Outpatient Treatment Service", icon: "bi bi-person-check-fill" },
  { name: "Pharmacy Service", icon: "bi bi-capsule-pill" },
  { name: "Laboratory Service", icon: "bi bi-beaker" },
];

function Services() {
  return (
    <>
      <Header />
      <div className="container py-5 services-page min-vh-100 d-flex flex-column">
        <h1 className="text-center mb-4 ">Our Services</h1>
        <div className="row g-4 flex-grow-1">
          {services.map((service, index) => (
            <div className="col-sm-6 col-md-4 col-lg-3" key={index}>
              <div className="card h-100 shadow-sm service-card text-center">
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                  <i className={`service-icon pulse-icon ${service.icon}`}></i>
                  <h5 className="card-title mt-3">{service.name}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Services;
