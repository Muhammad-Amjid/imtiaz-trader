
import React from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";

function CorporateServices() {
  const whatsappLink =
    "https://wa.me/923495092195?text=" +
    encodeURIComponent(
      "Hello Imtiaz Trader! I am interested in corporate and bulk IT supply. Please share details about your available products and supply options."
    );

  return (
    <ScrollReveal>
      <section className="corporate-section">
        <div className="container">
          <div className="corporate-card">
            <div className="corporate-decoration corporate-decoration-one"></div>
            <div className="corporate-decoration corporate-decoration-two"></div>

            <div className="row align-items-center g-4 position-relative">
              <div className="col-lg-8">
                <div className="corporate-content">
                  <span className="corporate-label">
                    <i className="bi bi-buildings-fill me-2"></i>
                    FOR BUSINESSES & ORGANIZATIONS
                  </span>

                  <h2>
                    Corporate & <span>Bulk IT Supply</span>
                  </h2>

                  <p className="corporate-description">
                    Looking for laptops, computers, servers or networking
                    equipment for your company? Imtiaz Trader can help arrange
                    IT equipment according to your business needs. We also
                    support bulk and customized IT supply requirements.
                  </p>

                  <div className="corporate-features">
                    <div>
                      <i className="bi bi-check-circle-fill"></i>
                      <span>Business IT Solutions</span>
                    </div>
                    <div>
                      <i className="bi bi-check-circle-fill"></i>
                      <span>Bulk Supply Support</span>
                    </div>
                    <div>
                      <i className="bi bi-check-circle-fill"></i>
                      <span>Customized Requirements</span>
                    </div>
                  </div>

                  <div className="corporate-buttons">
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="corporate-primary-btn"
                    >
                      <i className="bi bi-whatsapp"></i>
                      Discuss Your Requirements
                      <i className="bi bi-arrow-up-right"></i>
                    </a>

                    <Link to="/products" className="corporate-secondary-btn">
                      Explore Products
                      <i className="bi bi-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="corporate-visual">
                  <div className="corporate-main-icon">
                    <i className="bi bi-buildings"></i>
                  </div>

                  <div className="corporate-floating-icon corporate-icon-one">
                    <i className="bi bi-laptop"></i>
                  </div>

                  <div className="corporate-floating-icon corporate-icon-two">
                    <i className="bi bi-pc-display"></i>
                  </div>

                  <div className="corporate-floating-icon corporate-icon-three">
                    <i className="bi bi-hdd-network"></i>
                  </div>

                  <div className="corporate-visual-text">
                    <strong>IT Solutions</strong>
                    <span>For Your Business</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .corporate-section {
          padding: 75px 0;
          background: #f7f7f7;
          overflow: hidden;
        }

        .corporate-card {
          position: relative;
          overflow: hidden;
          background: #171717;
          border-radius: 22px;
          padding: 55px 45px;
          color: #fff;
          box-shadow: 0 15px 40px rgba(0,0,0,0.12);
        }

        .corporate-decoration {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }

        .corporate-decoration-one {
          width: 350px;
          height: 350px;
          border: 65px solid rgba(220,38,38,0.10);
          top: -190px;
          right: -90px;
        }

        .corporate-decoration-two {
          width: 230px;
          height: 230px;
          background: rgba(220,38,38,0.08);
          bottom: -160px;
          left: 35%;
        }

        .corporate-content {
          position: relative;
          z-index: 2;
        }

        .corporate-label {
          display: inline-flex;
          align-items: center;
          background: rgba(220,38,38,0.15);
          color: #ff7777;
          border: 1px solid rgba(220,38,38,0.35);
          padding: 10px 15px;
          border-radius: 30px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          margin-bottom: 22px;
        }

        .corporate-content h2 {
          font-size: clamp(30px, 4vw, 43px);
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 20px;
          color: #fff;
        }

        .corporate-content h2 span {
          color: #ef4444;
        }

        .corporate-description {
          max-width: 650px;
          color: #c5c5c5;
          font-size: 15px;
          line-height: 1.9;
          margin-bottom: 25px;
        }

        .corporate-features {
          display: flex;
          flex-wrap: wrap;
          gap: 15px 22px;
          margin-bottom: 30px;
        }

        .corporate-features div {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #e5e5e5;
          font-size: 13px;
          font-weight: 500;
        }

        .corporate-features i {
          color: #ef4444;
          font-size: 16px;
        }

        .corporate-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 13px;
        }

        .corporate-primary-btn,
        .corporate-secondary-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 21px;
          border-radius: 8px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 700;
          transition: all 0.3s ease;
        }

        .corporate-primary-btn {
          background: #dc2626;
          color: #fff;
        }

        .corporate-primary-btn:hover {
          background: #b91c1c;
          color: #fff;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(220,38,38,0.3);
        }

        .corporate-secondary-btn {
          border: 1px solid #777;
          color: #fff;
        }

        .corporate-secondary-btn:hover {
          background: #fff;
          border-color: #fff;
          color: #171717;
          transform: translateY(-3px);
        }

        .corporate-visual {
          min-height: 300px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .corporate-main-icon {
          width: 190px;
          height: 190px;
          border-radius: 50%;
          background: linear-gradient(145deg, #dc2626, #8f1010);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 0 20px rgba(220,38,38,0.10),
                      0 0 55px rgba(220,38,38,0.25);
        }

        .corporate-main-icon i {
          color: #fff;
          font-size: 85px;
        }

        .corporate-floating-icon {
          position: absolute;
          width: 62px;
          height: 62px;
          border-radius: 15px;
          background: #fff;
          color: #dc2626;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 27px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.25);
        }

        .corporate-icon-one {
          top: 20px;
          left: 15px;
        }

        .corporate-icon-two {
          top: 35px;
          right: 10px;
        }

        .corporate-icon-three {
          bottom: 65px;
          left: 5px;
        }

        .corporate-visual-text {
          position: absolute;
          bottom: 5px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .corporate-visual-text strong {
          font-size: 17px;
          color: #fff;
        }

        .corporate-visual-text span {
          font-size: 12px;
          color: #aaa;
        }

        @media (max-width: 991px) {
          .corporate-card {
            padding: 40px 30px;
          }

          .corporate-visual {
            min-height: 280px;
          }
        }

        @media (max-width: 768px) {
          .corporate-section {
            padding: 24px 0;
          }

          .corporate-card {
            padding: 25px 22px;
          }

          .corporate-description {
            font-size: 14px;
            line-height: 1.6;
            margin-bottom: 16px;
          }

          .corporate-features {
            gap: 10px 16px;
            margin-bottom: 18px;
          }

          .corporate-visual {
            min-height: 210px;
          }
        }

        @media (max-width: 576px) {
          .corporate-section {
            padding: 14px 0;
          }

          .corporate-section .container {
            padding-left: 10px;
            padding-right: 10px;
          }

          .corporate-card {
            padding: 19px 15px;
            border-radius: 13px;
          }

          .corporate-card .row {
            --bs-gutter-y: 10px;
          }

          .corporate-label {
            font-size: 8px;
            letter-spacing: 0.4px;
            padding: 6px 9px;
            margin-bottom: 10px;
          }

          .corporate-content h2 {
            font-size: 22px;
            line-height: 1.2;
            margin-bottom: 10px;
          }

          .corporate-description {
            font-size: 12px;
            line-height: 1.5;
            margin-bottom: 12px;
          }

          .corporate-features {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            margin-bottom: 14px;
          }

          .corporate-features div {
            font-size: 10px;
            gap: 5px;
          }

          .corporate-features i {
            font-size: 12px;
          }

          .corporate-buttons {
            flex-direction: row;
            gap: 7px;
          }

          .corporate-primary-btn,
          .corporate-secondary-btn {
            width: auto;
            flex: 1;
            padding: 10px 7px;
            gap: 5px;
            font-size: 10px;
            text-align: center;
          }

          .corporate-visual {
            min-height: 125px;
            max-width: 210px;
            margin: 0 auto;
          }

          .corporate-main-icon {
            width: 95px;
            height: 95px;
            box-shadow: 0 0 0 10px rgba(220,38,38,0.10),
                        0 0 30px rgba(220,38,38,0.25);
          }

          .corporate-main-icon i {
            font-size: 43px;
          }

          .corporate-floating-icon {
            width: 34px;
            height: 34px;
            border-radius: 9px;
            font-size: 15px;
          }

          .corporate-icon-one {
            top: 5px;
            left: 5px;
          }

          .corporate-icon-two {
            top: 8px;
            right: 5px;
          }

          .corporate-icon-three {
            bottom: 25px;
            left: 2px;
          }

          .corporate-visual-text {
            bottom: 0;
            gap: 1px;
          }

          .corporate-visual-text strong {
            font-size: 12px;
          }

          .corporate-visual-text span {
            font-size: 9px;
          }
        }

        @media (max-width: 380px) {
          .corporate-card {
            padding: 16px 12px;
          }

          .corporate-content h2 {
            font-size: 20px;
          }

          .corporate-primary-btn,
          .corporate-secondary-btn {
            font-size: 9px;
          }
        }
      `}</style>
    </ScrollReveal>
  );
}

export default CorporateServices;
