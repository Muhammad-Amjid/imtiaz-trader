
import React from "react";
import ScrollReveal from "./ScrollReveal";

function LaptopExchange() {
  const whatsappLink =
    "https://wa.me/923355703153?text=" +
    encodeURIComponent(
      "Hello Imtiaz Trader! I want to sell or exchange my used laptop. Please guide me about the process."
    );

  return (
    <ScrollReveal>
      <section className="exchange-section">
        <div className="container">
          <div className="exchange-card">
            <div className="row align-items-center g-4">

              {/* Left Visual */}
              <div className="col-lg-5">
                <div className="exchange-visual">
                  <div className="exchange-circle">
                    <i className="bi bi-arrow-left-right"></i>
                  </div>

                  <div className="exchange-icon exchange-icon-one">
                    <i className="bi bi-laptop"></i>
                  </div>

                  <div className="exchange-icon exchange-icon-two">
                    <i className="bi bi-arrow-repeat"></i>
                  </div>

                  <div className="exchange-icon exchange-icon-three">
                    <i className="bi bi-currency-exchange"></i>
                  </div>

                  <div className="exchange-visual-text">
                    <strong>Sell or Exchange</strong>
                    <span>Give your device a new purpose</span>
                  </div>
                </div>
              </div>

              {/* Right Content */}
              <div className="col-lg-7">
                <div className="exchange-content">
                  <span className="exchange-label">
                    <i className="bi bi-arrow-left-right me-2"></i>
                    SELL OR EXCHANGE
                  </span>

                  <h2>
                    Give Your Old Laptop
                    <span> a New Purpose</span>
                  </h2>

                  <p>
                    Want to sell your used laptop or exchange it for another
                    device? Contact Imtiaz Trader to discuss your laptop
                    and exchange requirements.
                  </p>

                  <div className="exchange-highlight">
                    <div className="exchange-highlight-icon">
                      <i className="bi bi-stars"></i>
                    </div>

                    <div>
                      <h5>Sell or Exchange</h5>
                      <span>
                        Your used laptop may be your next upgrade.
                      </span>
                    </div>
                  </div>

                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="exchange-button"
                  >
                    <i className="bi bi-whatsapp"></i>
                    Contact Us Now
                    <i className="bi bi-arrow-up-right"></i>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <style>{`
        .exchange-section {
          padding: 75px 0;
          background: #fff;
          overflow: hidden;
          width: 100%;
        }

        .exchange-card {
          background: #f7f7f7;
          border-radius: 22px;
          padding: 45px;
          border: 1px solid #eee;
          overflow: hidden;
        }

        .exchange-visual {
          min-height: 320px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .exchange-circle {
          width: 205px;
          height: 205px;
          border-radius: 50%;
          background: linear-gradient(145deg, #dc2626, #991b1b);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow:
            0 0 0 20px rgba(220,38,38,.08),
            0 15px 40px rgba(220,38,38,.2);
        }

        .exchange-circle i {
          color: white;
          font-size: 85px;
        }

        .exchange-icon {
          position: absolute;
          width: 62px;
          height: 62px;
          background: white;
          color: #dc2626;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 27px;
          box-shadow: 0 8px 25px rgba(0,0,0,.12);
        }

        .exchange-icon-one {
          top: 25px;
          left: 15px;
        }

        .exchange-icon-two {
          top: 35px;
          right: 10px;
        }

        .exchange-icon-three {
          bottom: 65px;
          right: 5px;
        }

        .exchange-visual-text {
          position: absolute;
          bottom: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          text-align: center;
          max-width: 100%;
        }

        .exchange-visual-text strong {
          color: #171717;
          font-size: 17px;
        }

        .exchange-visual-text span {
          color: #777;
          font-size: 12px;
        }

        .exchange-label {
          display: inline-block;
          padding: 10px 15px;
          border-radius: 30px;
          background: #fee2e2;
          color: #dc2626;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          margin-bottom: 20px;
        }

        .exchange-content h2 {
          color: #171717;
          font-size: clamp(30px, 4vw, 42px);
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 18px;
        }

        .exchange-content h2 span {
          color: #dc2626;
        }

        .exchange-content > p {
          color: #666;
          line-height: 1.9;
          font-size: 15px;
          margin-bottom: 25px;
        }

        .exchange-highlight {
          display: flex;
          align-items: center;
          gap: 15px;
          background: white;
          padding: 17px;
          border-radius: 12px;
          border-left: 4px solid #dc2626;
          margin-bottom: 25px;
        }

        .exchange-highlight-icon {
          width: 48px;
          height: 48px;
          flex-shrink: 0;
          background: #fee2e2;
          color: #dc2626;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 23px;
        }

        .exchange-highlight h5 {
          font-size: 15px;
          font-weight: 700;
          margin-bottom: 5px;
          color: #171717;
        }

        .exchange-highlight span {
          color: #777;
          font-size: 13px;
        }

        .exchange-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 23px;
          border-radius: 8px;
          background: #dc2626;
          color: white;
          text-decoration: none;
          font-weight: 700;
          font-size: 14px;
          transition: .3s ease;
        }

        .exchange-button:hover {
          background: #171717;
          color: white;
          transform: translateY(-3px);
        }

        /* Tablet */

        @media (max-width: 991px) {
          .exchange-section {
            padding: 60px 0;
          }

          .exchange-card {
            padding: 35px 25px;
          }

          .exchange-visual {
            min-height: 290px;
          }
        }

        /* Mobile */

        @media (max-width: 576px) {
          .exchange-section {
            padding: 25px 0;
          }

          .exchange-card {
            padding: 18px 16px;
            border-radius: 15px;
          }

          .exchange-card .row {
            --bs-gutter-y: 0.75rem;
          }

          .exchange-visual {
            min-height: 165px;
          }

          .exchange-circle {
            width: 115px;
            height: 115px;
            box-shadow:
              0 0 0 11px rgba(220,38,38,.08),
              0 10px 25px rgba(220,38,38,.18);
          }

          .exchange-circle i {
            font-size: 48px;
          }

          .exchange-icon {
            width: 39px;
            height: 39px;
            font-size: 18px;
            border-radius: 10px;
          }

          .exchange-icon-one {
            top: 8px;
            left: 12%;
          }

          .exchange-icon-two {
            top: 12px;
            right: 12%;
          }

          .exchange-icon-three {
            bottom: 28px;
            right: 13%;
          }

          .exchange-visual-text {
            bottom: 0;
            gap: 2px;
          }

          .exchange-visual-text strong {
            font-size: 13px;
          }

          .exchange-visual-text span {
            font-size: 10px;
          }

          .exchange-label {
            padding: 7px 11px;
            font-size: 10px;
            letter-spacing: 0.7px;
            margin-bottom: 10px;
          }

          .exchange-content h2 {
            font-size: 24px;
            line-height: 1.2;
            margin-bottom: 9px;
          }

          .exchange-content > p {
            font-size: 12px;
            line-height: 1.6;
            margin-bottom: 12px;
          }

          .exchange-highlight {
            padding: 10px;
            gap: 10px;
            margin-bottom: 13px;
            border-radius: 9px;
          }

          .exchange-highlight-icon {
            width: 36px;
            height: 36px;
            font-size: 17px;
          }

          .exchange-highlight h5 {
            font-size: 12px;
            margin-bottom: 3px;
          }

          .exchange-highlight span {
            font-size: 10px;
          }

          .exchange-button {
            width: 100%;
            padding: 11px 13px;
            font-size: 12px;
            gap: 8px;
            border-radius: 7px;
          }
        }

        /* Small Mobile */

        @media (max-width: 400px) {
          .exchange-section {
            padding: 20px 0;
          }

          .exchange-card {
            padding: 15px 12px;
          }

          .exchange-visual {
            min-height: 150px;
          }

          .exchange-circle {
            width: 105px;
            height: 105px;
          }

          .exchange-circle i {
            font-size: 43px;
          }

          .exchange-icon {
            width: 35px;
            height: 35px;
            font-size: 16px;
          }

          .exchange-icon-one {
            left: 10%;
          }

          .exchange-icon-two {
            right: 10%;
          }

          .exchange-icon-three {
            right: 11%;
            bottom: 25px;
          }

          .exchange-visual-text strong {
            font-size: 12px;
          }

          .exchange-visual-text span {
            font-size: 9px;
          }

          .exchange-content h2 {
            font-size: 22px;
          }

          .exchange-content > p {
            font-size: 11px;
          }

          .exchange-label {
            font-size: 9px;
            padding: 6px 9px;
          }

          .exchange-highlight {
            padding: 9px;
            gap: 8px;
          }

          .exchange-highlight-icon {
            width: 33px;
            height: 33px;
            font-size: 16px;
          }

          .exchange-highlight h5 {
            font-size: 11px;
          }

          .exchange-highlight span {
            font-size: 9px;
          }

          .exchange-button {
            padding: 10px;
            font-size: 11px;
          }
        }
      `}</style>
    </ScrollReveal>
  );
}

export default LaptopExchange;
