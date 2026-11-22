
import React from "react";
import ScrollReveal from "./ScrollReveal";

function SoftwareServices() {
  const whatsappLink =
    "https://wa.me/923495092195?text=" +
    encodeURIComponent(
      "Hello Imtiaz Trader! I am interested in website development or custom software services. Please discuss my requirements with me."
    );

  return (
    <ScrollReveal>
      <section className="software-section">
        <div className="container">
          <div className="software-card">
            <div className="software-decoration software-decoration-one"></div>
            <div className="software-decoration software-decoration-two"></div>

            <div className="row align-items-center g-4 position-relative">
              <div className="col-lg-7">
                <div className="software-content">
                  <span className="software-label">
                    <i className="bi bi-code-slash me-2"></i>
                    ADDITIONAL SERVICES
                  </span>

                  <h2>
                    Software & <span>Web Development</span>
                  </h2>

                  <p className="software-description">
                    Need a professional website or a custom software
                    solution for your business? We can help turn your
                    ideas into practical digital solutions.
                  </p>

                  <div className="software-highlight">
                    <div className="software-highlight-icon">
                      <i className="bi bi-globe2"></i>
                    </div>

                    <div>
                      <h5>Digital Solutions</h5>
                      <span>
                        Websites and custom software for your business.
                      </span>
                    </div>
                  </div>

                  <div className="software-features">
                    <span>
                      <i className="bi bi-check-circle-fill"></i>
                      Website Development
                    </span>

                    <span>
                      <i className="bi bi-check-circle-fill"></i>
                      Custom Software
                    </span>

                    <span>
                      <i className="bi bi-check-circle-fill"></i>
                      Business Solutions
                    </span>
                  </div>

                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="software-button"
                  >
                    <i className="bi bi-whatsapp"></i>
                    Discuss Your Project
                    <i className="bi bi-arrow-up-right"></i>
                  </a>
                </div>
              </div>

              <div className="col-lg-5">
                <div className="software-visual">
                  <div className="software-main-icon">
                    <i className="bi bi-code-square"></i>
                  </div>

                  <div className="software-floating software-icon-one">
                    <i className="bi bi-globe"></i>
                  </div>

                  <div className="software-floating software-icon-two">
                    <i className="bi bi-window-stack"></i>
                  </div>

                  <div className="software-floating software-icon-three">
                    <i className="bi bi-database"></i>
                  </div>

                  <div className="software-visual-text">
                    <strong>Digital Solutions</strong>
                    <span>Ideas into Reality</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .software-section {
          padding: 75px 0;
          background: #f7f7f7;
          overflow: hidden;
          width: 100%;
        }

        .software-card {
          position: relative;
          overflow: hidden;
          background: #171717;
          color: white;
          border-radius: 22px;
          padding: 50px 45px;
          box-shadow: 0 15px 40px rgba(0,0,0,.12);
        }

        .software-decoration {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }

        .software-decoration-one {
          width: 350px;
          height: 350px;
          border: 65px solid rgba(220,38,38,.10);
          top: -190px;
          right: -100px;
        }

        .software-decoration-two {
          width: 250px;
          height: 250px;
          background: rgba(220,38,38,.07);
          bottom: -180px;
          left: 35%;
        }

        .software-content {
          position: relative;
          z-index: 2;
        }

        .software-label {
          display: inline-block;
          padding: 10px 15px;
          background: rgba(220,38,38,.15);
          border: 1px solid rgba(220,38,38,.35);
          border-radius: 30px;
          color: #ff7777;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          margin-bottom: 22px;
        }

        .software-content h2 {
          color: white;
          font-size: clamp(30px, 4vw, 42px);
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 20px;
        }

        .software-content h2 span {
          color: #ef4444;
        }

        .software-description {
          max-width: 650px;
          color: #c5c5c5;
          font-size: 15px;
          line-height: 1.9;
          margin-bottom: 25px;
        }

        .software-highlight {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 17px;
          background: rgba(255,255,255,.07);
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 12px;
          margin-bottom: 23px;
        }

        .software-highlight-icon {
          width: 48px;
          height: 48px;
          flex-shrink: 0;
          background: #dc2626;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 23px;
        }

        .software-highlight h5 {
          font-size: 15px;
          font-weight: 700;
          margin-bottom: 5px;
          color: white;
        }

        .software-highlight span {
          font-size: 13px;
          color: #bbb;
        }

        .software-features {
          display: flex;
          flex-wrap: wrap;
          gap: 12px 20px;
          margin-bottom: 27px;
        }

        .software-features span {
          color: #ddd;
          font-size: 13px;
        }

        .software-features i {
          color: #ef4444;
          margin-right: 7px;
        }

        .software-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 22px;
          background: #dc2626;
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 700;
          transition: .3s ease;
        }

        .software-button:hover {
          background: white;
          color: #171717;
          transform: translateY(-3px);
        }

        .software-visual {
          position: relative;
          min-height: 320px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .software-main-icon {
          width: 190px;
          height: 190px;
          border-radius: 50%;
          background: linear-gradient(145deg, #dc2626, #991b1b);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow:
            0 0 0 20px rgba(220,38,38,.10),
            0 0 55px rgba(220,38,38,.25);
        }

        .software-main-icon i {
          color: white;
          font-size: 85px;
        }

        .software-floating {
          position: absolute;
          width: 62px;
          height: 62px;
          border-radius: 15px;
          background: white;
          color: #dc2626;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 27px;
          box-shadow: 0 8px 25px rgba(0,0,0,.25);
        }

        .software-icon-one {
          top: 20px;
          left: 10px;
        }

        .software-icon-two {
          top: 35px;
          right: 5px;
        }

        .software-icon-three {
          bottom: 65px;
          left: 5px;
        }

        .software-visual-text {
          position: absolute;
          bottom: 5px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .software-visual-text strong {
          font-size: 17px;
          color: white;
        }

        .software-visual-text span {
          font-size: 12px;
          color: #aaa;
        }

        @media (max-width: 991px) {
          .software-card {
            padding: 40px 30px;
          }

          .software-visual {
            min-height: 290px;
          }
        }

        @media (max-width: 576px) {
          .software-section {
            padding: 14px 0;
          }

          .software-section .container {
            width: 100%;
            max-width: 100%;
            padding-left: 10px;
            padding-right: 10px;
          }

          .software-card {
            width: 100%;
            padding: 18px 14px;
            border-radius: 13px;
          }

          .software-card .row {
            --bs-gutter-y: 8px;
          }

          .software-label {
            font-size: 8px;
            letter-spacing: .5px;
            padding: 6px 9px;
            margin-bottom: 9px;
          }

          .software-content h2 {
            font-size: 22px;
            line-height: 1.2;
            margin-bottom: 9px;
          }

          .software-description {
            font-size: 12px;
            line-height: 1.5;
            margin-bottom: 11px;
          }

          .software-highlight {
            padding: 9px;
            gap: 9px;
            margin-bottom: 11px;
            border-radius: 9px;
          }

          .software-highlight-icon {
            width: 34px;
            height: 34px;
            font-size: 16px;
          }

          .software-highlight h5 {
            font-size: 11px;
            margin-bottom: 2px;
          }

          .software-highlight span {
            font-size: 10px;
          }

          .software-features {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 7px;
            margin-bottom: 12px;
          }

          .software-features span {
            font-size: 10px;
          }

          .software-features i {
            margin-right: 4px;
            font-size: 10px;
          }

          .software-button {
            width: 100%;
            padding: 10px 7px;
            font-size: 11px;
            gap: 6px;
          }

          .software-visual {
            min-height: 125px;
            max-width: 210px;
            margin: 0 auto;
          }

          .software-main-icon {
            width: 95px;
            height: 95px;
            box-shadow:
              0 0 0 10px rgba(220,38,38,.10),
              0 0 30px rgba(220,38,38,.25);
          }

          .software-main-icon i {
            font-size: 43px;
          }

          .software-floating {
            width: 34px;
            height: 34px;
            border-radius: 9px;
            font-size: 15px;
          }

          .software-icon-one {
            left: 5px;
            top: 3px;
          }

          .software-icon-two {
            right: 5px;
            top: 6px;
          }

          .software-icon-three {
            left: 2px;
            bottom: 20px;
          }

          .software-visual-text {
            bottom: 0;
            gap: 1px;
          }

          .software-visual-text strong {
            font-size: 11px;
          }

          .software-visual-text span {
            font-size: 9px;
          }
        }

        @media (max-width: 400px) {
          .software-section .container {
            padding-left: 7px;
            padding-right: 7px;
          }

          .software-card {
            padding: 16px 11px;
          }

          .software-content h2 {
            font-size: 20px;
          }

          .software-description {
            font-size: 11px;
          }

          .software-features span {
            font-size: 9px;
          }

          .software-visual {
            min-height: 115px;
          }
        }
      `}</style>
    </ScrollReveal>
  );
}

export default SoftwareServices;
