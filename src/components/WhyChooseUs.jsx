
import React from "react";
import ScrollReveal from "./ScrollReveal";

function WhyChooseUs() {
  const features = [
    {
      icon: "bi bi-patch-check-fill",
      title: "Quality Products",
      description:
        "We offer carefully selected new and used laptops and IT equipment.",
    },
    {
      icon: "bi bi-tags-fill",
      title: "Competitive Prices",
      description:
        "Get quality technology at prices that suit your budget.",
    },
    {
      icon: "bi bi-headset",
      title: "Customer Support",
      description:
        "We help customers choose the right products for their needs.",
    },
    {
      icon: "bi bi-building",
      title: "Bulk & Corporate Supply",
      description:
        "We provide IT equipment solutions for businesses and organizations.",
    },
  ];

  return (
    <ScrollReveal>
      <section className="why-choose-section">
        <div className="container">
          <div className="text-center why-header">
            <span className="why-subtitle">WHY CHOOSE US</span>
            <h2 className="why-heading">Why Imtiaz Trader?</h2>
            <p className="why-intro">
              Your technology needs, our priority.
            </p>
          </div>

          <div className="row g-3 g-md-4 why-features-grid">
            {features.map((feature, index) => (
              <div
                className="col-12 col-sm-6 col-lg-3 why-feature-column"
                key={index}
              >
                <div className="why-card">
                  <div className="why-icon">
                    <i className={feature.icon}></i>
                  </div>

                  <h5>{feature.title}</h5>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          .why-choose-section {
            width: 100%;
            padding: 75px 0;
            background: #f8f8f8;
            overflow: hidden;
          }

          .why-header {
            margin-bottom: 40px;
          }

          .why-subtitle {
            color: #dc2626;
            font-weight: 700;
            font-size: 13px;
            letter-spacing: 2px;
          }

          .why-heading {
            color: #171717;
            font-size: 34px;
            font-weight: 800;
            margin: 12px 0;
          }

          .why-intro {
            color: #666;
            font-size: 16px;
            margin-bottom: 0;
          }

          .why-card {
            background: #fff;
            padding: 32px 22px;
            min-height: 230px;
            height: 100%;
            text-align: center;
            border-radius: 12px;
            border: 1px solid #eee;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            transition: all 0.3s ease;
          }

          .why-card:hover {
            transform: translateY(-7px);
            box-shadow: 0 12px 25px rgba(0,0,0,0.08);
            border-color: #dc2626;
          }

          .why-icon {
            width: 68px;
            height: 68px;
            flex-shrink: 0;
            background: #dc2626;
            color: #fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 22px;
            font-size: 27px;
            transition: all 0.3s ease;
          }

          .why-card:hover .why-icon {
            background: #171717;
            transform: rotate(5deg);
          }

          .why-card h5 {
            color: #171717;
            font-size: 17px;
            font-weight: 700;
            margin-bottom: 12px;
          }

          .why-card p {
            color: #666;
            font-size: 14px;
            line-height: 1.7;
            margin-bottom: 0;
          }

          @media (max-width: 991px) {
            .why-choose-section {
              padding: 60px 0;
            }

            .why-card {
              min-height: 220px;
              padding: 28px 18px;
            }
          }

          /* All four feature cards in one row on phones */
          @media (max-width: 575.98px) {
            .why-choose-section {
              padding: 30px 0;
            }

            .why-choose-section .container {
              padding-left: 7px;
              padding-right: 7px;
            }

            .why-header {
              margin-bottom: 20px;
            }

            .why-subtitle {
              font-size: 10px;
              letter-spacing: 1px;
            }

            .why-heading {
              font-size: 23px;
              margin: 8px 0;
            }

            .why-intro {
              font-size: 12px;
            }

            .why-features-grid {
              --bs-gutter-x: 6px;
              --bs-gutter-y: 6px;
            }

            .why-features-grid > .why-feature-column {
              width: 25%;
              flex: 0 0 25%;
              max-width: 25%;
              padding-left: 3px;
              padding-right: 3px;
            }

            .why-card {
              min-height: 155px;
              padding: 12px 4px;
              border-radius: 7px;
            }

            .why-icon {
              width: 34px;
              height: 34px;
              font-size: 15px;
              margin-bottom: 9px;
            }

            .why-card h5 {
              font-size: 9px;
              line-height: 1.3;
              margin-bottom: 6px;
              overflow-wrap: anywhere;
            }

            .why-card p {
              font-size: 8px;
              line-height: 1.35;
            }
          }
        `}</style>
      </section>
    </ScrollReveal>
  );
}

export default WhyChooseUs;
