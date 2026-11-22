
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Footer() {
  return (
    <footer className="imtiaz-footer">
      <div className="container">
        <div className="footer-main">

          {/* BUSINESS INFORMATION */}
          <div className="footer-business">
            <Link to="/" className="footer-logo-link">
              <img
                src={logo}
                alt="Imtiaz Trader"
                className="footer-logo"
              />
            </Link>

            <p className="footer-description">
              Your destination for laptops, computers, accessories and
              IT equipment. Providing technology solutions for individuals
              and businesses.
            </p>

            <div className="footer-social">
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>

              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>

              <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <i className="bi bi-tiktok"></i>
              </a>

              <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <i className="bi bi-youtube"></i>
              </a>

              <a href="https://wa.me/923495092195" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <i className="bi bi-whatsapp"></i>
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="footer-links">
            <h5 className="footer-heading">Quick Links</h5>

            <ul>
              <li>
                <Link to="/">
                  <i className="bi bi-chevron-right"></i> Home
                </Link>
              </li>

              <li>
                <Link to="/products">
                  <i className="bi bi-chevron-right"></i> Products
                </Link>
              </li>

              <li>
                <Link to="/about">
                  <i className="bi bi-chevron-right"></i> About Us
                </Link>
              </li>

              <li>
                <Link to="/contact">
                  <i className="bi bi-chevron-right"></i> Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT INFORMATION */}
          <div className="footer-contact">
            <h5 className="footer-heading">Contact & Visit Us</h5>

            <div className="footer-contact-item">
              <i className="bi bi-geo-alt-fill"></i>
              <p>
                Shop No. 141 / 141-A, First Floor, Umair Center,
                6th Road, Rawalpindi, Pakistan.
              </p>
            </div>

            <div className="footer-contact-item">
              <i className="bi bi-telephone-fill"></i>
              <a href="tel:+923495092195">
                +92 335 570 3153
              </a>
            </div>

            <div className="footer-contact-item">
              <i className="bi bi-envelope-fill"></i>
              <a href="mailto:kjawadiqbal@gmail.com">
                kjawadiqbal@gmail.com
              </a>
            </div>

            {/* GOOGLE MAP */}
            <div className="footer-small-map">
              <iframe
                title="Imtiaz Trader Shop Location"
                src="https://www.google.com/maps?q=Umair%20Center%2C%206th%20Road%2C%20Rawalpindi%2C%20Pakistan&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              ></iframe>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Shop+141A+Umair+Center+6th+Road+Rawalpindi+Pakistan"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-directions"
            >
              <i className="bi bi-geo-alt-fill"></i>
              Get Directions
              <i className="bi bi-arrow-up-right"></i>
            </a>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Imtiaz Trader.
            All Rights Reserved.
          </p>

          <span>
            Laptops, Computers & IT Equipment
          </span>
        </div>
      </div>

      <style>{`
        .imtiaz-footer {
          background: #171717;
          color: #fff;
          padding: 60px 0 0;
          font-weight: 400;
        }

        .footer-main {
          display: grid;
          grid-template-columns: 1.2fr 0.7fr 1.1fr;
          gap: 55px;
          padding-bottom: 40px;
        }

        /* BUSINESS */

        .footer-logo {
          width: 170px;
          max-width: 100%;
          border-radius: 12px;
          object-fit: contain;
        }

        .footer-logo-link {
          display: inline-block;
        }

        .footer-description {
          color: #ccc;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.9;
          margin: 20px 0;
          max-width: 350px;
        }

        /* SOCIAL ICONS */

        .footer-social {
          display: flex;
          flex-wrap: wrap;
          gap: 11px;
        }

        .footer-social a {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #555;
          border-radius: 50%;
          color: #fff;
          font-size: 17px;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .footer-social a:hover {
          background: #dc2626;
          border-color: #dc2626;
          color: #fff;
          transform: translateY(-4px);
        }

        /* HEADINGS */

        .footer-heading {
          display: block !important;
          visibility: visible !important;
          color: #fff !important;
          font-size: 19px !important;
          font-weight: 700 !important;
          line-height: 1.4;
          opacity: 1 !important;
          margin: 0 0 26px;
          padding-bottom: 13px;
          position: relative;
          text-transform: none;
        }

        .footer-heading::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 42px;
          height: 3px;
          border-radius: 5px;
          background: #dc2626;
        }

        /* QUICK LINKS */

        .footer-links ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 17px;
        }

        .footer-links a {
          display: inline-block;
          color: #ccc !important;
          text-decoration: none;
          font-size: 14px;
          font-weight: 400;
          transition: all 0.3s ease;
        }

        .footer-links a i {
          color: #ef4444;
          margin-right: 8px;
          font-size: 11px;
        }

        .footer-links a:hover {
          color: #fff !important;
          padding-left: 5px;
        }

        /* CONTACT */

        .footer-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 13px;
          margin-bottom: 17px;
        }

        .footer-contact-item > i {
          flex-shrink: 0;
          color: #ef4444;
          font-size: 17px;
          margin-top: 3px;
        }

        .footer-contact-item p,
        .footer-contact-item a {
          color: #ccc !important;
          font-size: 13px;
          font-weight: 400;
          line-height: 1.8;
          margin: 0;
          text-decoration: none;
          overflow-wrap: anywhere;
          transition: color 0.3s ease;
        }

        .footer-contact-item a:hover {
          color: #ff5555 !important;
        }

        /* GOOGLE MAP */

        .footer-small-map {
          width: 100%;
          height: 125px;
          margin-top: 18px;
          overflow: hidden;
          border-radius: 8px;
          border: 1px solid #555;
          background: #252525;
        }

        .footer-small-map iframe {
          width: 100%;
          height: 100%;
          display: block;
          border: 0;
        }

        .footer-directions {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 12px;
          color: #ff5555 !important;
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
          transition: 0.3s;
        }

        .footer-directions:hover {
          color: #fff !important;
        }

        /* COPYRIGHT */

        .footer-bottom {
          min-height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          border-top: 1px solid #383838;
        }

        .footer-bottom p {
          color: #aaa;
          font-size: 13px;
          font-weight: 400;
          margin: 0;
        }

        .footer-bottom span {
          color: #888;
          font-size: 12px;
          font-weight: 400;
        }

        /* TABLET */

        @media (max-width: 991px) {
          .footer-main {
            grid-template-columns: 1.1fr 0.8fr 1.1fr;
            gap: 22px;
          }

          .footer-logo {
            width: 135px;
          }

          .footer-description {
            font-size: 12px;
            line-height: 1.7;
          }

          .footer-heading {
            font-size: 16px !important;
            margin-bottom: 20px;
          }

          .footer-links a {
            font-size: 12px;
          }

          .footer-contact-item {
            gap: 8px;
          }

          .footer-contact-item p,
          .footer-contact-item a {
            font-size: 11px;
            line-height: 1.6;
          }

          .footer-small-map {
            height: 105px;
          }
        }

        /* MOBILE */

        @media (max-width: 575px) {
          .imtiaz-footer {
            padding-top: 28px;
          }

          .footer-main {
            grid-template-columns: 1fr 0.78fr 1.15fr;
            gap: 9px;
            padding-bottom: 20px;
            align-items: start;
          }

          .footer-business,
          .footer-links,
          .footer-contact {
            min-width: 0;
            grid-column: auto;
          }

          .footer-logo {
            width: 100%;
            max-width: 85px;
          }

          .footer-description {
            font-size: 9px;
            line-height: 1.5;
            margin: 9px 0;
            overflow-wrap: anywhere;
          }

          .footer-social {
            gap: 4px;
          }

          .footer-social a {
            width: 23px;
            height: 23px;
            font-size: 11px;
          }

          .footer-heading {
            font-size: 11px !important;
            line-height: 1.4;
            margin-bottom: 12px;
            padding-bottom: 7px;
          }

          .footer-heading::after {
            width: 27px;
            height: 2px;
          }

          .footer-links li {
            margin-bottom: 9px;
          }

          .footer-links a {
            font-size: 9px;
            line-height: 1.5;
          }

          .footer-links a i {
            font-size: 7px;
            margin-right: 2px;
          }

          .footer-contact-item {
            gap: 4px;
            margin-bottom: 8px;
          }

          .footer-contact-item > i {
            font-size: 10px;
            margin-top: 2px;
          }

          .footer-contact-item p,
          .footer-contact-item a {
            font-size: 8px;
            line-height: 1.5;
          }

          .footer-small-map {
            height: 65px;
            margin-top: 8px;
            border-radius: 5px;
          }

          .footer-directions {
            gap: 3px;
            margin-top: 7px;
            font-size: 8px;
          }

          .footer-bottom {
            min-height: auto;
            flex-direction: column;
            justify-content: center;
            text-align: center;
            gap: 5px;
            padding: 13px 0;
          }

          .footer-bottom p {
            font-size: 9px;
          }

          .footer-bottom span {
            font-size: 8px;
          }
        }

        /* VERY SMALL PHONES */

        @media (max-width: 360px) {
          .footer-main {
            gap: 6px;
          }

          .footer-heading {
            font-size: 10px !important;
          }

          .footer-description,
          .footer-links a {
            font-size: 8px;
          }

          .footer-contact-item p,
          .footer-contact-item a {
            font-size: 7px;
          }

          .footer-social a {
            width: 21px;
            height: 21px;
            font-size: 10px;
          }
        }
      `}</style>
    </footer>
  );
}

export default Footer;
