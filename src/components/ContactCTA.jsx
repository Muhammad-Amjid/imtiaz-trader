
import React, { useEffect } from "react";

const ContactCTA = () => {
  const whatsappLink =
    "https://wa.me/923495092195?text=" +
    encodeURIComponent(
      "Hello Imtiaz Trader! I would like to enquire about your products and IT services."
    );

  useEffect(() => {
    const styleId = "imtiaz-contact-cta-styles";

    if (document.getElementById(styleId)) return;

    const style = document.createElement("style");
    style.id = styleId;

    style.innerHTML = `
      .contact-cta-section {
        padding: 85px 5%;
        background: #f5f5f5;
        overflow: hidden;
      }

      .contact-cta-container {
        position: relative;
        max-width: 1250px;
        margin: auto;
        padding: 75px 65px;
        display: grid;
        grid-template-columns: 1.1fr 0.9fr;
        align-items: center;
        gap: 55px;
        background: linear-gradient(125deg, #101010, #202020 65%, #171717);
        border-radius: 28px;
        overflow: hidden;
        isolation: isolate;
        box-shadow:
          0 25px 55px rgba(0,0,0,0.22),
          inset 0 1px 1px rgba(255,255,255,0.08);
      }

      /* 3D Background */

      .contact-cta-container::before {
        content: "";
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
        background-size: 35px 35px;
        mask-image: linear-gradient(to right, black, transparent);
        z-index: -1;
        pointer-events: none;
      }

      .cta-glow {
        position: absolute;
        border-radius: 50%;
        filter: blur(75px);
        pointer-events: none;
        z-index: -1;
      }

      .cta-glow-one {
        width: 280px;
        height: 280px;
        background: rgba(220,25,35,0.24);
        top: -100px;
        right: 15%;
      }

      .cta-glow-two {
        width: 220px;
        height: 220px;
        background: rgba(190,20,30,0.18);
        bottom: -100px;
        left: 10%;
      }

      .cta-circle {
        position: absolute;
        width: 390px;
        height: 390px;
        border: 1px solid rgba(255,255,255,0.07);
        border-radius: 50%;
        right: -150px;
        top: -180px;
        z-index: -1;
      }

      /* Left Content */

      .cta-left {
        position: relative;
        z-index: 2;
      }

      .cta-label {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        color: #ff5555;
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 2px;
        margin-bottom: 24px;
      }

      .cta-label-dot {
        width: 8px;
        height: 8px;
        flex-shrink: 0;
        background: #ff3838;
        border-radius: 50%;
        box-shadow: 0 0 12px #ff3838;
      }

      .cta-left h2 {
        color: #ffffff;
        font-size: clamp(32px, 4vw, 49px);
        line-height: 1.2;
        font-weight: 800;
        letter-spacing: -1.5px;
        margin: 0 0 22px;
      }

      .cta-left h2 span {
        color: #ff4141;
        text-shadow: 0 0 25px rgba(255,50,50,0.2);
      }

      .cta-left p {
        color: #bcbcbc;
        font-size: 15px;
        line-height: 1.9;
        max-width: 490px;
        margin-bottom: 28px;
      }

      .cta-features {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
      }

      .cta-features div {
        color: #eeeeee;
        font-size: 13px;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .cta-features i {
        color: #ff4141;
        font-size: 15px;
      }

      /* Right 3D Contact Card */

      .cta-right {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        perspective: 1000px;
      }

      .cta-card {
        width: 100%;
        max-width: 390px;
        position: relative;
        padding: 34px;
        border-radius: 22px;
        background: linear-gradient(145deg, #292929, #191919);
        border: 1px solid rgba(255,255,255,0.12);
        box-shadow:
          15px 20px 35px rgba(0,0,0,0.4),
          inset 2px 2px 4px rgba(255,255,255,0.08),
          inset -2px -2px 5px rgba(0,0,0,0.3);
        transform: rotateY(-5deg) rotateX(3deg);
        transition: all 0.4s ease;
      }

      .cta-card:hover {
        transform: rotateY(0) rotateX(0) translateY(-7px);
        box-shadow:
          18px 25px 45px rgba(0,0,0,0.45),
          0 0 35px rgba(220,30,40,0.12);
      }

      .cta-card-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 27px;
      }

      .cta-icon {
        width: 55px;
        height: 55px;
        border-radius: 15px;
        background: linear-gradient(145deg, #ff4444, #b90016);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 25px;
        box-shadow:
          0 7px 18px rgba(220,0,20,0.35),
          inset 1px 1px 3px rgba(255,255,255,0.3);
      }

      .cta-status {
        color: #d0d0d0;
        font-size: 9px;
        font-weight: 800;
        letter-spacing: 1.3px;
        display: flex;
        align-items: center;
        gap: 7px;
      }

      .cta-status span {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #42d98b;
        box-shadow: 0 0 8px #42d98b;
      }

      .cta-card h3 {
        color: #ffffff;
        font-size: 27px;
        font-weight: 800;
        line-height: 1.3;
        margin: 0 0 14px;
      }

      .cta-card p {
        color: #b8b8b8;
        font-size: 13px;
        line-height: 1.8;
        margin-bottom: 25px;
      }

      .cta-button {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 12px;
        padding: 16px 18px;
        color: #ffffff !important;
        background: linear-gradient(135deg, #ff4545, #cf0018);
        border-radius: 12px;
        text-decoration: none !important;
        font-size: 14px;
        font-weight: 800;
        box-shadow:
          0 8px 20px rgba(220,0,20,0.3),
          inset 0 1px 2px rgba(255,255,255,0.25);
        transition: all 0.3s ease;
      }

      .cta-button:hover {
        background: linear-gradient(135deg, #ff6262, #e00020);
        transform: translateY(-3px);
        box-shadow: 0 12px 25px rgba(220,0,20,0.4);
      }

      .cta-button i:first-child {
        font-size: 19px;
      }

      .cta-card-footer {
        margin-top: 22px;
        padding-top: 17px;
        border-top: 1px solid rgba(255,255,255,0.09);
        color: #999999;
        font-size: 11px;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .cta-card-footer i {
        color: #ff4545;
        font-size: 14px;
      }

      /* Floating Icons */

      .cta-floating-icon {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 53px;
        height: 53px;
        color: #ff5555;
        background: linear-gradient(145deg, #333333, #191919);
        border: 1px solid rgba(255,255,255,0.12);
        border-radius: 15px;
        box-shadow: 8px 10px 20px rgba(0,0,0,0.35);
        font-size: 23px;
        z-index: 3;
      }

      .cta-float-one {
        top: 5px;
        right: -5px;
        transform: rotate(12deg);
      }

      .cta-float-two {
        bottom: 5px;
        left: -5px;
        transform: rotate(-12deg);
      }

      /* Tablet */

      @media (max-width: 900px) {
        .contact-cta-container {
          padding: 55px 35px;
          gap: 30px;
        }

        .cta-left h2 {
          font-size: 36px;
        }

        .cta-card {
          padding: 27px;
        }
      }

      /* Mobile */

      @media (max-width: 700px) {
        .contact-cta-section {
          padding: 28px 5%;
        }

        .contact-cta-container {
          grid-template-columns: 1fr;
          padding: 25px 20px;
          gap: 15px;
          border-radius: 18px;
        }

        .cta-label {
          font-size: 10px;
          letter-spacing: 1.2px;
          gap: 7px;
          margin-bottom: 12px;
        }

        .cta-label-dot {
          width: 7px;
          height: 7px;
        }

        .cta-left h2 {
          font-size: 27px;
          line-height: 1.2;
          letter-spacing: -0.7px;
          margin-bottom: 10px;
        }

        .cta-left p {
          font-size: 12px;
          line-height: 1.6;
          margin-bottom: 13px;
        }

        .cta-features {
          gap: 10px 16px;
        }

        .cta-features div {
          font-size: 11px;
          gap: 6px;
        }

        .cta-features i {
          font-size: 13px;
        }

        .cta-right {
          padding: 8px 5px;
        }

        .cta-card {
          max-width: 100%;
          padding: 20px;
          border-radius: 16px;
          transform: none;
        }

        .cta-card-top {
          margin-bottom: 13px;
        }

        .cta-icon {
          width: 43px;
          height: 43px;
          font-size: 20px;
          border-radius: 12px;
        }

        .cta-status {
          font-size: 8px;
        }

        .cta-card h3 {
          font-size: 21px;
          line-height: 1.25;
          margin-bottom: 9px;
        }

        .cta-card p {
          font-size: 11px;
          line-height: 1.6;
          margin-bottom: 14px;
        }

        .cta-button {
          padding: 12px 14px;
          font-size: 12px;
          gap: 9px;
          border-radius: 9px;
        }

        .cta-button i:first-child {
          font-size: 16px;
        }

        .cta-card-footer {
          margin-top: 13px;
          padding-top: 11px;
          font-size: 10px;
          gap: 6px;
        }

        .cta-card-footer i {
          font-size: 12px;
        }

        .cta-floating-icon {
          width: 37px;
          height: 37px;
          font-size: 17px;
          border-radius: 11px;
        }

        .cta-float-one {
          top: 0;
          right: -3px;
        }

        .cta-float-two {
          bottom: 0;
          left: -3px;
        }
      }

      /* Small Mobile */

      @media (max-width: 400px) {
        .contact-cta-section {
          padding: 22px 4%;
        }

        .contact-cta-container {
          padding: 21px 15px;
          gap: 12px;
        }

        .cta-left h2 {
          font-size: 25px;
        }

        .cta-left p {
          font-size: 11px;
        }

        .cta-features {
          gap: 8px 12px;
        }

        .cta-features div {
          font-size: 10px;
        }

        .cta-card {
          padding: 17px;
        }

        .cta-card h3 {
          font-size: 19px;
        }

        .cta-card p {
          font-size: 10px;
        }

        .cta-button {
          padding: 11px;
          font-size: 11px;
        }
      }
    `;

    document.head.appendChild(style);

    return () => {
      style.remove();
    };
  }, []);

  return (
    <section className="contact-cta-section">
      <div className="contact-cta-container">

        {/* Background Effects */}
        <div className="cta-glow cta-glow-one"></div>
        <div className="cta-glow cta-glow-two"></div>
        <div className="cta-circle"></div>

        {/* Left Content */}
        <div className="cta-left">
          <span className="cta-label">
            <span className="cta-label-dot"></span>
            LET'S FIND THE RIGHT SOLUTION
          </span>

          <h2>
            Looking for the
            <br />
            Right <span>IT Equipment?</span>
          </h2>

          <p>
            Contact Imtiaz Trader today. Let's find the right
            technology for your needs.
          </p>

          <div className="cta-features">
            <div>
              <i className="bi bi-check-circle-fill"></i>
              Quality IT Equipment
            </div>

            <div>
              <i className="bi bi-check-circle-fill"></i>
              Personalised Assistance
            </div>
          </div>
        </div>

        {/* Right 3D Contact Card */}
        <div className="cta-right">
          <div className="cta-card">
            <div className="cta-card-top">
              <div className="cta-icon">
                <i className="bi bi-headset"></i>
              </div>

              <span className="cta-status">
                <span></span>
                HERE TO HELP
              </span>
            </div>

            <h3>
              Let's Find Your
              <br />
              Perfect Solution.
            </h3>

            <p>
              Have a question or need help choosing the right
              equipment? Get in touch with us today.
            </p>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button"
            >
              <i className="bi bi-whatsapp"></i>
              Get In Touch
              <i className="bi bi-arrow-up-right"></i>
            </a>

            <div className="cta-card-footer">
              <i className="bi bi-chat-dots"></i>
              We're just a message away
            </div>
          </div>

          <div className="cta-floating-icon cta-float-one">
            <i className="bi bi-laptop"></i>
          </div>

          <div className="cta-floating-icon cta-float-two">
            <i className="bi bi-cpu"></i>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
