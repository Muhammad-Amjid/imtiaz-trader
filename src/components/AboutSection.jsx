
import React from "react";
import ScrollReveal from "./ScrollReveal";

const services = [
  {
    icon: "bi-laptop",
    title: "New & Used Laptops",
    message:
      "Hello Imtiaz Trader! I'm interested in buying a new or used laptop. Please share available options and prices.",
  },
  {
    icon: "bi-pc-display",
    title: "Desktop Computers",
    message:
      "Hello Imtiaz Trader! I'm interested in desktop computers. Please share available options and prices.",
  },
  {
    icon: "bi-headphones",
    title: "Laptop Accessories",
    message:
      "Hello Imtiaz Trader! I want to enquire about laptop accessories. Please share available products and prices.",
  },
  {
    icon: "bi-router",
    title: "Networking Equipment",
    message:
      "Hello Imtiaz Trader! I need information about networking equipment. Please share available options.",
  },
  {
    icon: "bi-server",
    title: "Servers on Demand",
    message:
      "Hello Imtiaz Trader! I'm interested in server solutions. Please contact me with available options.",
  },
  {
    icon: "bi-building",
    title: "Bulk & Corporate IT Supplies",
    message:
      "Hello Imtiaz Trader! I need bulk or corporate IT supplies for my business. Please discuss my requirements.",
  },
];

function AboutSection() {
  return (
    <section className="about-section">
      <div className="container">
        <ScrollReveal>
          <div className="about-heading text-center">
            <span className="about-label">ABOUT OUR BUSINESS</span>
            <h2>
              About <span>Imtiaz Trader</span>
            </h2>
            <p>Your Trusted Technology Partner</p>
          </div>
        </ScrollReveal>

        <div className="about-intro">
          <ScrollReveal>
            <div className="about-intro-content">
              <span className="about-label">WHO WE ARE</span>

              <h3>
                Technology Solutions <span>You Can Trust</span>
              </h3>

              <p>
                Imtiaz Trader is a technology business based in Rawalpindi,
                Pakistan. We provide laptops, desktop computers, accessories
                and IT equipment for individuals and businesses.
              </p>

              <p>
                We deal in both new and used laptops and computers. We also
                provide networking equipment and help customers find the
                right technology according to their requirements.
              </p>

              <p>
                Whether you are an individual customer or a company looking
                for bulk IT supplies, our goal is to provide suitable
                technology solutions.
              </p>

              <div className="about-business-sign">
                <div className="about-sign-icon">
                  <i className="bi bi-pc-display-horizontal"></i>
                </div>

                <div>
                  <h5>Imtiaz Trader</h5>
                  <span>Laptops, Computers & IT Equipment</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="about-visual">
              <div className="about-visual-main">
                <i className="bi bi-laptop"></i>
                <h4>Technology for Everyone</h4>
                <p>
                  Personal, professional and business IT solutions.
                </p>
              </div>

              <div className="about-visual-badge">
                <i className="bi bi-check-circle-fill"></i>
                <span>Your Technology Partner</span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div className="about-services">
            <div className="about-section-heading text-center">
              <span className="about-label">OUR SERVICES</span>

              <h3>
                What We <span>Offer</span>
              </h3>

              <p>
                Technology products and solutions for individuals and
                businesses. Click any service to enquire on WhatsApp.
              </p>
            </div>

            <div className="about-services-grid">
              {services.map((service, index) => (
                <a
                  href={`https://wa.me/923495092195?text=${encodeURIComponent(
                    service.message
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-service-card"
                  key={index}
                >
                  <div className="about-service-icon">
                    <i className={`bi ${service.icon}`}></i>
                  </div>

                  <div className="about-service-info">
                    <h5>{service.title}</h5>

                    <span>
                      Inquire Now <i className="bi bi-arrow-up-right"></i>
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="about-location">
            <div className="about-location-icon">
              <i className="bi bi-geo-alt-fill"></i>
            </div>

            <div className="about-location-content">
              <span className="about-label">VISIT OUR SHOP</span>

              <h3>
                Find Us in <span>Rawalpindi</span>
              </h3>

              <p>
                Shop No. 141 / 141-A, First Floor, Umair Center,
                6th Road, Rawalpindi, Pakistan.
              </p>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Umair+Center+6th+Road+Rawalpindi+Pakistan"
              target="_blank"
              rel="noopener noreferrer"
              className="about-location-btn"
            >
              <i className="bi bi-map"></i> Find Our Location
            </a>
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        .about-section {
          padding: 85px 0;
          background: #fff;
          color: #222;
          overflow: hidden;
          width: 100%;
        }

        .about-label {
          display: inline-block;
          color: #dc2626;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 2px;
          margin-bottom: 12px;
        }

        .about-heading {
          margin-bottom: 65px;
        }

        .about-heading h2 {
          font-size: clamp(30px, 4vw, 43px);
          font-weight: 800;
          margin-bottom: 10px;
        }

        .about-heading h2 span,
        .about-intro-content h3 span,
        .about-section-heading h3 span,
        .about-location h3 span {
          color: #dc2626;
        }

        .about-heading p,
        .about-section-heading p {
          color: #777;
          margin: 0;
        }

        .about-intro {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          align-items: center;
          gap: 55px;
          margin-bottom: 90px;
        }

        .about-intro-content h3 {
          font-size: clamp(25px, 3vw, 34px);
          font-weight: 800;
          margin-bottom: 22px;
          line-height: 1.3;
        }

        .about-intro-content p {
          color: #666;
          font-size: 15px;
          line-height: 1.9;
          margin-bottom: 14px;
        }

        .about-business-sign {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-top: 28px;
          padding-top: 22px;
          border-top: 1px solid #eee;
        }

        .about-sign-icon {
          width: 52px;
          height: 52px;
          flex-shrink: 0;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #dc2626;
          color: white;
          font-size: 25px;
        }

        .about-business-sign h5 {
          font-weight: 800;
          margin: 0 0 4px;
        }

        .about-business-sign span {
          color: #777;
          font-size: 13px;
        }

        .about-visual {
          min-height: 350px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 35px;
          border-radius: 22px;
          background: linear-gradient(135deg, #171717, #303030);
          overflow: hidden;
        }

        .about-visual::before,
        .about-visual::after {
          content: "";
          position: absolute;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 50%;
        }

        .about-visual::before {
          width: 320px;
          height: 320px;
          top: -120px;
          right: -100px;
        }

        .about-visual::after {
          width: 230px;
          height: 230px;
          bottom: -120px;
          left: -70px;
        }

        .about-visual-main {
          position: relative;
          z-index: 1;
          text-align: center;
          color: white;
          max-width: 100%;
        }

        .about-visual-main > i {
          display: inline-flex;
          width: 115px;
          height: 115px;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #dc2626;
          font-size: 58px;
          margin-bottom: 25px;
          box-shadow: 0 12px 35px rgba(220,38,38,0.3);
        }

        .about-visual-main h4 {
          font-size: 23px;
          font-weight: 800;
        }

        .about-visual-main p {
          color: #ccc;
          font-size: 14px;
          margin: 0;
        }

        .about-visual-badge {
          position: absolute;
          bottom: 20px;
          right: 20px;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 11px 15px;
          border-radius: 30px;
          background: white;
          color: #222;
          font-size: 12px;
          font-weight: 700;
        }

        .about-visual-badge i {
          color: #dc2626;
        }

        .about-services {
          margin-bottom: 85px;
        }

        .about-section-heading {
          margin-bottom: 35px;
        }

        .about-section-heading h3 {
          font-size: 32px;
          font-weight: 800;
          margin-bottom: 10px;
        }

        .about-services-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
        }

        .about-service-card {
          min-width: 0;
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 23px 20px;
          border: 1px solid #eee;
          border-radius: 13px;
          background: #fff;
          color: #222;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .about-service-card:hover {
          transform: translateY(-5px);
          border-color: #dc2626;
          box-shadow: 0 10px 25px rgba(0,0,0,0.07);
          color: #222;
        }

        .about-service-icon {
          flex-shrink: 0;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          background: #fff0f0;
          color: #dc2626;
          font-size: 23px;
          transition: all 0.3s ease;
        }

        .about-service-card:hover .about-service-icon {
          background: #dc2626;
          color: white;
        }

        .about-service-info {
          flex: 1;
          min-width: 0;
        }

        .about-service-info h5 {
          font-size: 15px;
          font-weight: 700;
          margin: 0 0 7px;
          overflow-wrap: anywhere;
          transition: color 0.3s ease;
        }

        .about-service-card:hover .about-service-info h5 {
          color: #dc2626;
        }

        .about-service-info span {
          color: #dc2626;
          font-size: 12px;
          font-weight: 700;
        }

        .about-service-info span i {
          margin-left: 4px;
        }

        .about-location {
          display: flex;
          align-items: center;
          gap: 22px;
          padding: 30px;
          margin-bottom: 65px;
          border-radius: 16px;
          background: #f7f7f7;
        }

        .about-location-icon {
          flex-shrink: 0;
          width: 65px;
          height: 65px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #dc2626;
          color: white;
          font-size: 28px;
        }

        .about-location-content {
          flex: 1;
          min-width: 0;
        }

        .about-location h3 {
          font-size: 24px;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .about-location p {
          color: #666;
          margin: 0;
          line-height: 1.7;
          font-size: 14px;
        }

        .about-location-btn {
          flex-shrink: 0;
          padding: 13px 19px;
          border-radius: 7px;
          background: #222;
          color: white;
          text-decoration: none;
          font-size: 13px;
          font-weight: 700;
          transition: 0.3s;
          white-space: nowrap;
        }

        .about-location-btn:hover {
          background: #dc2626;
          color: white;
        }

        @media (max-width: 991px) {
          .about-section {
            padding: 65px 0;
          }

          .about-intro {
            gap: 30px;
          }

          .about-services-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .about-location {
            flex-wrap: wrap;
          }
        }

        @media (max-width: 767px) {
          .about-section {
            padding: 35px 0;
          }

          .about-heading {
            margin-bottom: 25px;
          }

          .about-intro {
            grid-template-columns: 1fr;
            gap: 16px;
            margin-bottom: 30px;
          }

          .about-intro-content p {
            font-size: 13px;
            line-height: 1.65;
            margin-bottom: 9px;
          }

          .about-business-sign {
            margin-top: 15px;
            padding-top: 13px;
          }

          .about-visual {
            min-height: 190px;
            padding: 18px;
          }

          .about-visual-main > i {
            width: 75px;
            height: 75px;
            font-size: 38px;
            margin-bottom: 12px;
          }

          .about-visual-main h4 {
            font-size: 19px;
            margin-bottom: 5px;
          }

          .about-visual-main p {
            font-size: 12px;
          }

          .about-visual-badge {
            bottom: 10px;
            right: 10px;
            padding: 7px 10px;
            font-size: 10px;
          }

          .about-services {
            margin-bottom: 30px;
          }

          .about-section-heading {
            margin-bottom: 17px;
          }

          .about-section-heading h3 {
            font-size: 25px;
          }

          .about-section-heading p {
            font-size: 12px;
            line-height: 1.5;
          }

          .about-location {
            align-items: center;
            gap: 12px;
            padding: 17px;
            margin-bottom: 15px;
          }

          .about-location-content {
            flex-basis: calc(100% - 65px);
          }

          .about-location-btn {
            margin-left: 60px;
          }
        }

        @media (max-width: 480px) {
          .about-section {
            padding: 24px 0 15px;
          }

          .about-section .container {
            width: 100%;
            max-width: 100%;
            padding-left: 8px;
            padding-right: 8px;
          }

          .about-heading {
            margin-bottom: 19px;
          }

          .about-label {
            font-size: 9px;
            letter-spacing: 1px;
            margin-bottom: 5px;
          }

          .about-heading h2 {
            font-size: 25px;
            margin-bottom: 4px;
          }

          .about-heading p {
            font-size: 12px;
          }

          .about-intro {
            gap: 12px;
            margin-bottom: 23px;
          }

          .about-intro-content h3 {
            font-size: 21px;
            line-height: 1.25;
            margin-bottom: 10px;
          }

          .about-intro-content p {
            font-size: 11px;
            line-height: 1.55;
            margin-bottom: 8px;
          }

          .about-business-sign {
            gap: 9px;
            margin-top: 11px;
            padding-top: 10px;
          }

          .about-sign-icon {
            width: 38px;
            height: 38px;
            font-size: 19px;
            border-radius: 8px;
          }

          .about-business-sign h5 {
            font-size: 12px;
          }

          .about-business-sign span {
            font-size: 10px;
          }

          .about-visual {
            min-height: 145px;
            padding: 12px;
            border-radius: 12px;
          }

          .about-visual::before {
            width: 180px;
            height: 180px;
            top: -75px;
            right: -65px;
          }

          .about-visual::after {
            width: 140px;
            height: 140px;
            bottom: -75px;
            left: -45px;
          }

          .about-visual-main > i {
            width: 57px;
            height: 57px;
            font-size: 29px;
            margin-bottom: 7px;
          }

          .about-visual-main h4 {
            font-size: 15px;
            margin-bottom: 3px;
          }

          .about-visual-main p {
            font-size: 10px;
          }

          .about-visual-badge {
            bottom: 6px;
            right: 6px;
            padding: 5px 7px;
            font-size: 8px;
            gap: 4px;
          }

          .about-services {
            margin-bottom: 22px;
          }

          .about-section-heading {
            margin-bottom: 12px;
          }

          .about-section-heading h3 {
            font-size: 22px;
            margin-bottom: 4px;
          }

          .about-section-heading p {
            font-size: 10px;
            line-height: 1.5;
          }

          /* Three compact service cards per row */
          .about-services-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 7px;
          }

          .about-service-card {
            padding: 10px 4px;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            gap: 6px;
            border-radius: 8px;
          }

          .about-service-card:hover {
            transform: translateY(-2px);
          }

          .about-service-icon {
            width: 30px;
            height: 30px;
            font-size: 15px;
            border-radius: 7px;
          }

          .about-service-info {
            width: 100%;
          }

          .about-service-info h5 {
            font-size: 9px;
            line-height: 1.3;
            margin-bottom: 4px;
            overflow-wrap: anywhere;
          }

          .about-service-info span {
            font-size: 8px;
          }

          .about-service-info span i {
            margin-left: 2px;
          }

          .about-location {
            display: grid;
            grid-template-columns: 40px 1fr;
            align-items: center;
            gap: 9px;
            padding: 12px;
            margin-bottom: 5px;
            border-radius: 10px;
          }

          .about-location-icon {
            width: 38px;
            height: 38px;
            font-size: 17px;
          }

          .about-location-content {
            min-width: 0;
          }

          .about-location-content .about-label {
            margin-bottom: 3px;
          }

          .about-location h3 {
            font-size: 16px;
            margin-bottom: 4px;
          }

          .about-location p {
            font-size: 10px;
            line-height: 1.45;
          }

          .about-location-btn {
            grid-column: 2;
            justify-self: start;
            margin: 0;
            padding: 8px 10px;
            font-size: 10px;
          }
        }

        @media (max-width: 350px) {
          .about-services-grid {
            gap: 5px;
          }

          .about-service-card {
            padding: 9px 3px;
          }

          .about-service-info h5 {
            font-size: 8px;
          }

          .about-service-info span {
            font-size: 7px;
          }

          .about-intro-content h3 {
            font-size: 19px;
          }
        }
      `}</style>
    </section>
  );
}

export default AboutSection;
