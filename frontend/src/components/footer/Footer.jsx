import React from "react";
import "./footer.css";
import facebook from "../../assets/image/icons/icons8-facebook-48.png";
import linkedin from "../../assets/image/icons/icons8-linkedin-48.png";
import telegram from "../../assets/image/icons/icons8-telegram-app-48.png";
import x from "../../assets/image/icons/icons8-x-48.png";

function Footer() {
  return (
    <footer className="bg-header-footer text-white mt-0 py-3">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div className="mb-2 mb-md-0">
          <p className="mb-0">&copy; 2025 Motite Fura Primary Hospital</p>
        </div>
        <div>
          <ul className="list-unstyled d-flex mb-0">
            <li className="ms-3">
              <a href="https://web.facebook.com/people/Mootite-Fura-Primary-Hospital-Hawassa/100075862701348/?sk=about">
                <img
                  className="social-media-img"
                  src={facebook}
                  alt="Facebook"
                />
              </a>
            </li>
            <li className="ms-3">
              <a href="#">
                <img
                  className="social-media-img"
                  src={linkedin}
                  alt="LinkedIn"
                />
              </a>
            </li>
            <li className="ms-3">
              <a href="#">
                <img
                  className="social-media-img"
                  src={telegram}
                  alt="Telegram"
                />
              </a>
            </li>
            <li className="ms-3">
              <a href="#">
                <img className="social-media-img" src={x} alt="X" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
