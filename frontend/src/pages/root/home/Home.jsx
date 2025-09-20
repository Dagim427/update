import React from "react";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import { Link } from "react-router-dom";
import "./home.css";

function Home() {
  return (
    <>
      <Header />
      {/* Hero Section */}
      <div className="hero-section d-flex align-items-center justify-content-center text-center mb-0">
        <div className="container text-white">
          <h1 className="welcome-heading">Welcome to Motite Fura Primary Hospital</h1>
          <p className="welcome-paragraph mx-auto">
            Providing quality and compassionate healthcare services to our community. Your health is our priority, and we are here to serve with professionalism and care.
          </p>
          <div className="d-flex justify-content-center gap-4 flex-wrap mt-4">
            <Link to="/contact">
              <button className="btn custom-btn btn-light">Contact Us</button>
            </Link>
            <Link to="/login">
              <button className="btn custom-btn btn-primary">Sign In</button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
