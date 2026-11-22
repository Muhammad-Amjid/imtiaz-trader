
import React, { useState } from "react";

const API = "https://imtiaz-trader-api.vercel.app/api/enquiries";
const WHATSAPP_NUMBER = "923495092195";
const PHONE_NUMBER = "+923495092195";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({
    type: "",
    message: "",
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setFeedback({ type: "", message: "" });

    try {
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to submit enquiry.");
      }

      const whatsappMessage = `
Hello Imtiaz Trader!

Name: ${form.name}
Phone: ${form.phone}
Subject: ${form.subject}

Message:
${form.message}
      `;

      setFeedback({
        type: "success",
        message: "Your enquiry has been saved successfully!",
      });

      setForm({
        name: "",
        phone: "",
        subject: "",
        message: "",
      });

      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          whatsappMessage
        )}`,
        "_blank",
        "noopener,noreferrer"
      );
    } catch (error) {
      setFeedback({
        type: "danger",
        message: error.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="bg-dark text-white py-5">
        <div className="container text-center">
          <p className="text-danger fw-bold">IMTIAZ TRADER</p>
          <h1 className="fw-bold">Contact Us</h1>
          <p className="text-white-50 mb-0">
            We're here to help you find the right technology.
          </p>
        </div>
      </section>

      <section className="container py-5">
        <div className="row g-4">
          <div className="col-12 col-lg-5">
            <h2 className="fw-bold mb-3">Get in Touch</h2>
            <p className="text-secondary mb-4">
              Have a question about a laptop, computer, accessory,
              bulk order or service? Contact our team.
            </p>

            <div className="card border-0 shadow-sm mb-3">
              <div className="card-body d-flex gap-3">
                <i className="bi bi-whatsapp text-danger fs-3"></i>
                <div>
                  <h5 className="fw-bold">WhatsApp</h5>
                  <p className="text-secondary mb-2">
                    Chat with us about products and orders.
                  </p>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-danger text-decoration-none fw-semibold"
                  >
                    +92 335 5703153
                  </a>
                </div>
              </div>
            </div>

            <div className="card border-0 shadow-sm mb-3">
              <div className="card-body d-flex gap-3">
                <i className="bi bi-telephone text-danger fs-3"></i>
                <div>
                  <h5 className="fw-bold">Call Us</h5>
                  <p className="text-secondary mb-2">
                    Speak with us directly.
                  </p>
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="text-danger text-decoration-none fw-semibold"
                  >
                    +92 335 5703153
                  </a>
                </div>
              </div>
            </div>

            <div className="card border-0 shadow-sm">
              <div className="card-body d-flex gap-3">
                <i className="bi bi-laptop text-danger fs-3"></i>
                <div>
                  <h5 className="fw-bold">Product Enquiries</h5>
                  <p className="text-secondary mb-0">
                    Ask about new and used laptops, computers,
                    accessories and bulk orders.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-7">
            <div className="card border-0 shadow-sm p-3 p-md-4">
              <h2 className="fw-bold mb-2">Send an Enquiry</h2>
              <p className="text-secondary mb-4">
                Submit your details and continue through WhatsApp.
              </p>

              {feedback.message && (
                <div className={`alert alert-${feedback.type}`}>
                  {feedback.message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-semibold">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-control"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold">
                      Subject
                    </label>
                    <select
                      name="subject"
                      className="form-select"
                      value={form.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select an enquiry type</option>
                      <option value="Product Enquiry">Product Enquiry</option>
                      <option value="Bulk Order">Bulk Order</option>
                      <option value="Laptop Exchange">Laptop Exchange</option>
                      <option value="Software Services">Software Services</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold">
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      className="form-control"
                      rows="5"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      required
                    ></textarea>
                  </div>

                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-danger btn-lg w-100"
                      disabled={loading}
                    >
                      <i className="bi bi-whatsapp me-2"></i>
                      {loading ? "Submitting..." : "Send Enquiry on WhatsApp"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;
