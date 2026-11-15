
import React, { useEffect, useState } from "react";

const API = `http://${window.location.hostname}:5000/api/enquiries`;

export default function EnquiryManagement() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    "Content-Type": "application/json",
  };

  const loadEnquiries = async () => {
    try {
      const response = await fetch(API, { headers });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      setEnquiries(data.enquiries || []);
    } catch (error) {
      setMessage(error.message || "Unable to load enquiries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(`${API}/${id}/status`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ status }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setEnquiries((previous) =>
        previous.map((item) =>
          item._id === id ? data.enquiry : item
        )
      );
    } catch (error) {
      setMessage(error.message);
    }
  };

  const deleteEnquiry = async (id) => {
    if (!window.confirm("Delete this enquiry?")) return;

    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setEnquiries((previous) =>
        previous.filter((item) => item._id !== id)
      );
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">Customer Enquiries</h2>

      {message && <div className="alert alert-info">{message}</div>}

      <div className="row g-3 mb-4">
        {["New", "In Progress", "Resolved"].map((status) => (
          <div className="col-md-4" key={status}>
            <div className="card border-0 shadow-sm p-3">
              <div className="text-muted">{status}</div>
              <h3 className="fw-bold mb-0">
                {enquiries.filter((item) => item.status === status).length}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {loading ? (
        <p>Loading enquiries...</p>
      ) : enquiries.length === 0 ? (
        <p>No customer enquiries yet.</p>
      ) : (
        <div className="row g-3">
          {enquiries.map((item) => (
            <div className="col-12" key={item._id}>
              <div className="card border-0 shadow-sm p-3">
                <div className="d-flex justify-content-between flex-wrap gap-2">
                  <div>
                    <h5 className="fw-bold mb-1">{item.subject}</h5>
                    <div>{item.name}</div>
                    <div className="text-muted small">
                      {item.phone}
                      {item.email && ` • ${item.email}`}
                    </div>
                  </div>

                  <div className="text-muted small">
                    {new Date(item.createdAt).toLocaleString()}
                  </div>
                </div>

                <p className="my-3">{item.message}</p>

                <div className="d-flex flex-wrap gap-2 align-items-center">
                  <select
                    className="form-select"
                    style={{ maxWidth: "180px" }}
                    value={item.status}
                    onChange={(e) =>
                      updateStatus(item._id, e.target.value)
                    }
                  >
                    <option>New</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                  </select>

                  <a
                    className="btn btn-success btn-sm"
                    href={`https://wa.me/${item.phone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp
                    
                  </a>

                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => deleteEnquiry(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
