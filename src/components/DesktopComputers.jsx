
import React from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";

const desktopOptions = [
  {
    title: "Business Desktop PCs",
    description:
      "Reliable desktop computers for offices and professional work.",
    icon: "bi-pc-display",
  },
  {
    title: "Gaming PCs",
    description:
      "Powerful desktop systems for gaming and demanding tasks.",
    icon: "bi-controller",
  },
  {
    title: "Custom Built PCs",
    description:
      "Desktop computers configured according to your requirements.",
    icon: "bi-tools",
  },
];

function DesktopComputers() {
  return (
    <ScrollReveal>
      <section className="desktop-section">
        <div className="container">
          <div className="text-center desktop-heading">
            <p className="text-danger fw-bold">DESKTOP SOLUTIONS</p>
            <h2 className="fw-bold">PCs & Desktop Computers</h2>
            <p className="text-secondary">
              Find reliable desktop solutions for business, gaming and everyday use.
            </p>
          </div>

          <div className="row g-3 g-md-4 desktop-options-grid">
            {desktopOptions.map((item) => (
              <div
                className="col-12 col-sm-6 col-md-4 desktop-option-column"
                key={item.title}
              >
                <div className="card desktop-card h-100 border-0 shadow-sm text-center">
                  <div className="desktop-icon">
                    <i className={`bi ${item.icon}`}></i>
                  </div>

                  <h5 className="fw-bold">{item.title}</h5>

                  <p className="text-secondary">
                    {item.description}
                  </p>

                  <Link
                    to="/contact"
                    className="btn btn-outline-danger mt-auto"
                  >
                    Enquire Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          .desktop-section {
            padding: 60px 0;
            background: #fff;
            overflow: hidden;
          }

          .desktop-heading {
            margin-bottom: 40px;
          }

          .desktop-heading h2 {
            font-size: clamp(26px, 3vw, 35px);
            color: #171717;
          }

          .desktop-heading p:last-child {
            font-size: 16px;
          }

          .desktop-card {
            padding: 35px 25px;
            border-radius: 12px;
            transition: transform .3s ease, box-shadow .3s ease;
          }

          .desktop-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 12px 25px rgba(0,0,0,.1) !important;
          }

          .desktop-icon {
            color: #a5222d;
            font-size: 45px;
            margin-bottom: 18px;
          }

          .desktop-card h5 {
            font-size: 18px;
            margin-bottom: 12px;
          }

          .desktop-card p {
            font-size: 14px;
            line-height: 1.7;
            margin-bottom: 22px;
          }

          @media (max-width: 768px) {
            .desktop-section {
              padding: 45px 0;
            }

            .desktop-heading {
              margin-bottom: 28px;
            }

            .desktop-card {
              padding: 28px 18px;
            }
          }

          @media (max-width: 575.98px) {
            .desktop-section {
              padding: 30px 0;
            }

            .desktop-section .container {
              padding-left: 8px;
              padding-right: 8px;
            }

            .desktop-heading {
              margin-bottom: 20px;
            }

            .desktop-heading h2 {
              font-size: 22px;
            }

            .desktop-heading p:last-child {
              font-size: 12px;
            }

            .desktop-options-grid {
              --bs-gutter-x: 8px;
              --bs-gutter-y: 8px;
            }

            .desktop-options-grid > .desktop-option-column {
              width: 33.333333%;
              flex: 0 0 33.333333%;
              max-width: 33.333333%;
              padding-left: 4px;
              padding-right: 4px;
            }

            .desktop-card {
              padding: 13px 5px;
              border-radius: 8px;
            }

            .desktop-icon {
              font-size: 27px;
              margin-bottom: 9px;
            }

            .desktop-card h5 {
              font-size: 10px;
              line-height: 1.3;
              margin-bottom: 7px;
            }

            .desktop-card p {
              font-size: 9px;
              line-height: 1.4;
              margin-bottom: 10px;
            }

            .desktop-card .btn {
              font-size: 9px;
              padding: 5px 2px;
              white-space: normal;
              line-height: 1.2;
            }
          }
        `}</style>
      </section>
    </ScrollReveal>
  );
}

export default DesktopComputers;
