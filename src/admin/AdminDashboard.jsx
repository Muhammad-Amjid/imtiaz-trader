
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "https://imtiaz-trader-api.vercel.app";

function AdminDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  let adminInfo = {};

  try {
    adminInfo = JSON.parse(
      localStorage.getItem("adminInfo") || "{}"
    );
  } catch {
    adminInfo = {};
  }

  const [products, setProducts] = useState(0);
  const [categories, setCategories] = useState(0);
  const [enquiries, setEnquiries] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingOrder, setUpdatingOrder] = useState("");

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        productResponse,
        orderResponse,
        categoryResponse,
        enquiryResponse,
      ] = await Promise.all([
        fetch(`${API}/api/products`),
        fetch(`${API}/api/admin/orders`, { headers }),
        fetch(`${API}/api/categories/admin/all`, { headers }),
        fetch(`${API}/api/enquiries`, { headers }),
      ]);

      const [
        productData,
        orderData,
        categoryData,
        enquiryData,
      ] = await Promise.all([
        productResponse.json(),
        orderResponse.json(),
        categoryResponse.json(),
        enquiryResponse.json(),
      ]);

      if (!productResponse.ok) {
        throw new Error(
          productData.message || "Could not load products."
        );
      }

      if (!orderResponse.ok) {
        throw new Error(
          orderData.message || "Could not load orders."
        );
      }

      if (!categoryResponse.ok) {
        throw new Error(
          categoryData.message || "Could not load categories."
        );
      }

      if (!enquiryResponse.ok) {
        throw new Error(
          enquiryData.message || "Could not load enquiries."
        );
      }

      setProducts(productData.products?.length || 0);
      setOrders(orderData.orders || []);
      setCategories(categoryData.categories?.length || 0);
      setEnquiries(enquiryData.enquiries || []);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadDashboard();
    }
  }, []);

  const openPage = (path) => {
    navigate(path);
  };

  const updateOrderStatus = async (id, status) => {
    try {
      setUpdatingOrder(id);

      const response = await fetch(
        `${API}/api/admin/orders/${id}/status`,
        {
          method: "PATCH",
          headers,
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Could not update order."
        );
      }

      await loadDashboard();
    } catch (err) {
      alert(err.message || "Could not update order.");
    } finally {
      setUpdatingOrder("");
    }
  };

  const verifyPayment = async (id) => {
    if (
      !window.confirm(
        "Have you confirmed the payment in your account?"
      )
    ) {
      return;
    }

    try {
      setUpdatingOrder(id);

      const response = await fetch(
        `${API}/api/admin/orders/${id}/payment`,
        {
          method: "PATCH",
          headers,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Could not verify payment."
        );
      }

      alert("Payment verified successfully.");

      await loadDashboard();
    } catch (err) {
      alert(err.message || "Could not verify payment.");
    } finally {
      setUpdatingOrder("");
    }
  };

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const awaitingPayments = orders.filter(
    (order) =>
      order.paymentStatus === "Awaiting Verification"
  ).length;

  const newEnquiries = enquiries.filter(
    (enquiry) => enquiry.status === "New"
  ).length;

  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString("en-PK");
  };

  const formatDate = (date) => {
    if (!date) return "Date not available";

    return new Date(date).toLocaleString("en-PK", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const getStatusClass = (status) => {
    const value = String(status || "").toLowerCase();

    if (value === "delivered" || value === "paid") {
      return "status-success";
    }

    if (
      value === "cancelled" ||
      value === "failed" ||
      value === "rejected"
    ) {
      return "status-danger";
    }

    if (
      value === "processing" ||
      value === "shipped"
    ) {
      return "status-info";
    }

    return "status-warning";
  };

  const scrollToOrders = () => {
    document
      .getElementById("customer-orders")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="admin-dashboard">
      <style>{`
        .admin-dashboard {
          width: 100%;
          min-width: 0;
          min-height: 100vh;
          padding: 0;
          background: #f5f6f8;
          color: #202124;
          font-family: Arial, Helvetica, sans-serif;
          box-sizing: border-box;
        }

        .admin-dashboard *,
        .admin-dashboard *::before,
        .admin-dashboard *::after {
          box-sizing: border-box;
        }

        .admin-main {
          width: 100%;
          max-width: 1600px;
          margin: 0 auto;
          padding: 28px;
        }

        /* HEADER */

        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 25px;
        }

        .admin-header h1 {
          margin: 0 0 7px;
          font-size: 28px;
          font-weight: 800;
          color: #181818;
          letter-spacing: -0.5px;
        }

        .admin-header p {
          margin: 0;
          color: #777;
          font-size: 14px;
          line-height: 1.6;
        }

        .admin-header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .admin-button {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          padding: 11px 17px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .admin-button-light {
          background: #fff;
          color: #333;
          border: 1px solid #e4e4e4;
        }

        .admin-button-light:hover {
          background: #fff5f5;
          border-color: #dc2626;
          color: #dc2626;
        }

        /* WELCOME */

        .admin-welcome {
          position: relative;
          overflow: hidden;
          background: linear-gradient(120deg, #171717, #303030);
          color: #fff;
          border-radius: 14px;
          padding: 28px;
          margin-bottom: 25px;
          box-shadow: 0 5px 18px rgba(0,0,0,0.07);
        }

        .admin-welcome::after {
          content: "";
          position: absolute;
          width: 190px;
          height: 190px;
          right: -45px;
          top: -85px;
          border-radius: 50%;
          border: 30px solid rgba(255,255,255,0.045);
          pointer-events: none;
        }

        .admin-welcome h2 {
          position: relative;
          z-index: 1;
          margin: 0 0 9px;
          font-size: 23px;
          font-weight: 800;
        }

        .admin-welcome p {
          position: relative;
          z-index: 1;
          max-width: 650px;
          margin: 0;
          color: #d0d0d0;
          font-size: 14px;
          line-height: 1.7;
        }

        /* ERROR */

        .admin-error {
          padding: 14px 17px;
          margin-bottom: 20px;
          border-radius: 9px;
          background: #fff0f0;
          border: 1px solid #fecaca;
          color: #991b1b;
          font-size: 14px;
        }

        /* STATISTICS */

        .admin-stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 17px;
          margin-bottom: 26px;
        }

        .admin-stat {
          position: relative;
          min-width: 0;
          padding: 21px;
          background: #fff;
          border: 1px solid #ededed;
          border-radius: 12px;
          box-shadow: 0 3px 12px rgba(0,0,0,0.025);
          transition: transform 0.2s ease,
                      box-shadow 0.2s ease;
        }

        .admin-stat:hover {
          transform: translateY(-3px);
          box-shadow: 0 7px 18px rgba(0,0,0,0.06);
        }

        .admin-stat-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 43px;
          height: 43px;
          margin-bottom: 16px;
          border-radius: 11px;
          background: #fff0f0;
          color: #dc2626;
          font-size: 21px;
        }

        .admin-stat-label {
          margin-bottom: 9px;
          color: #777;
          font-size: 13px;
          font-weight: 600;
          line-height: 1.5;
        }

        .admin-stat-value {
          color: #171717;
          font-size: 30px;
          font-weight: 800;
          line-height: 1.2;
        }

        /* SECTIONS */

        .admin-quick-section,
        .admin-orders-section {
          min-width: 0;
          padding: 23px;
          margin-bottom: 25px;
          background: #fff;
          border: 1px solid #ededed;
          border-radius: 13px;
          box-shadow: 0 3px 12px rgba(0,0,0,0.025);
        }

        .admin-section-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 20px;
        }

        .admin-section-heading h2 {
          margin: 0;
          color: #202124;
          font-size: 20px;
          font-weight: 800;
        }

        /* QUICK MANAGEMENT */

        .admin-quick-actions {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 13px;
        }

        .admin-quick-action {
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-width: 0;
          min-height: 105px;
          padding: 17px;
          text-align: left;
          background: #fafafa;
          border: 1px solid #ededed;
          border-radius: 10px;
          color: #222;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .admin-quick-action:hover {
          background: #fff5f5;
          border-color: #dc2626;
          transform: translateY(-2px);
        }

        .admin-quick-action strong {
          display: block;
          margin-bottom: 9px;
          font-size: 14px;
          font-weight: 800;
        }

        .admin-quick-action span {
          color: #777;
          font-size: 12px;
          line-height: 1.6;
        }

        /* ORDER CARDS */

        .admin-order-card {
          min-width: 0;
          padding: 21px;
          margin-bottom: 17px;
          background: #fff;
          border: 1px solid #e9e9e9;
          border-radius: 12px;
          transition: box-shadow 0.2s ease,
                      border-color 0.2s ease;
        }

        .admin-order-card:last-child {
          margin-bottom: 0;
        }

        .admin-order-card:hover {
          border-color: #dedede;
          box-shadow: 0 5px 16px rgba(0,0,0,0.045);
        }

        .admin-order-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 18px;
          flex-wrap: wrap;
          padding-bottom: 17px;
          margin-bottom: 17px;
          border-bottom: 1px solid #eeeeee;
        }

        .admin-order-heading {
          min-width: 0;
          flex: 1;
        }

        .admin-order-top h3 {
          margin: 0 0 9px;
          color: #202124;
          font-size: 17px;
          font-weight: 800;
          overflow-wrap: anywhere;
        }

        .admin-order-top p {
          margin: 5px 0;
          color: #777;
          font-size: 13px;
          line-height: 1.6;
          overflow-wrap: anywhere;
        }

        .admin-order-price {
          color: #dc2626;
          font-size: 21px;
          font-weight: 800;
          white-space: nowrap;
        }

        .admin-order-date {
          display: inline-block;
          margin-top: 5px;
          color: #888;
          font-size: 12px;
        }

        /* ORDER DETAILS */

        .admin-order-details {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
          padding: 15px;
          background: #f8f8f8;
          border: 1px solid #eeeeee;
          border-radius: 10px;
        }

        .admin-detail-item {
          min-width: 0;
          font-size: 13px;
          line-height: 1.6;
          overflow-wrap: anywhere;
        }

        .admin-detail-label {
          display: block;
          margin-bottom: 5px;
          color: #888;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.4px;
        }

        .admin-detail-value {
          color: #333;
          font-weight: 700;
        }

        .admin-reference {
          grid-column: 1 / -1;
          padding-top: 10px;
          border-top: 1px solid #e7e7e7;
        }

        /* STATUS BADGES */

        .admin-status-badge {
          display: inline-flex;
          align-items: center;
          padding: 5px 10px;
          border-radius: 30px;
          font-size: 11px;
          font-weight: 800;
          white-space: nowrap;
        }

        .status-success {
          background: #dcfce7;
          color: #166534;
        }

        .status-warning {
          background: #fef3c7;
          color: #92400e;
        }

        .status-danger {
          background: #fee2e2;
          color: #991b1b;
        }

        .status-info {
          background: #dbeafe;
          color: #1e40af;
        }

        /* ORDERED ITEMS */

        .admin-order-items {
          padding: 17px 0;
          border-bottom: 1px solid #eeeeee;
        }

        .admin-order-items-title {
          display: block;
          margin-bottom: 11px;
          color: #222;
          font-size: 13px;
          font-weight: 800;
        }

        .admin-order-item {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          padding: 8px 0;
          color: #555;
          font-size: 13px;
          line-height: 1.5;
        }

        .admin-order-item-name {
          min-width: 0;
          overflow-wrap: anywhere;
        }

        .admin-order-item-price {
          color: #333;
          font-weight: 700;
          white-space: nowrap;
        }

        /* CUSTOMER INFORMATION */

        .admin-customer-info {
          padding: 15px;
          margin-top: 14px;
          background: #fffafa;
          border: 1px solid #f5e5e5;
          border-radius: 9px;
        }

        .admin-customer-info strong {
          display: block;
          margin-bottom: 8px;
          color: #333;
          font-size: 13px;
        }

        .admin-customer-info p {
          margin: 5px 0;
          color: #666;
          font-size: 13px;
          line-height: 1.6;
          overflow-wrap: anywhere;
        }

        /* ORDER ACTIONS */

        .admin-order-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          padding-top: 17px;
        }

        .admin-order-action-left {
          display: flex;
          align-items: center;
          gap: 9px;
          flex-wrap: wrap;
        }

        .admin-verify-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 11px 16px;
          color: #fff;
          background: #198754;
          border: none;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 800;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .admin-verify-button:hover {
          background: #146c43;
        }

        .admin-verify-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .admin-status-select {
          min-width: 160px;
          max-width: 100%;
          padding: 11px 13px;
          background: #fff;
          border: 1px solid #dedede;
          border-radius: 8px;
          color: #333;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          outline: none;
        }

        .admin-status-select:focus {
          border-color: #dc2626;
        }

        .admin-status-select:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* LOADING AND EMPTY */

        .admin-empty {
          padding: 40px 15px;
          text-align: center;
          color: #888;
          font-size: 14px;
          background: #fafafa;
          border: 1px dashed #ddd;
          border-radius: 10px;
        }

        .admin-loading-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          margin-right: 7px;
          background: #dc2626;
          border-radius: 50%;
          animation: adminPulse 1s infinite alternate;
        }

        @keyframes adminPulse {
          from { opacity: 0.3; }
          to { opacity: 1; }
        }

        /* TABLET */

        @media (max-width: 1000px) {
          .admin-main {
            padding: 22px;
          }

          .admin-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .admin-quick-actions {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .admin-order-details {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        /* MOBILE */

        @media (max-width: 650px) {
          .admin-main {
            padding: 17px 13px 30px;
          }

          .admin-header {
            align-items: flex-start;
            margin-bottom: 18px;
          }

          .admin-header h1 {
            font-size: 23px;
          }

          .admin-header p {
            font-size: 12px;
          }

          .admin-welcome {
            padding: 21px 18px;
            margin-bottom: 18px;
          }

          .admin-welcome h2 {
            font-size: 19px;
          }

          .admin-welcome p {
            font-size: 12px;
          }

          .admin-stats {
            gap: 10px;
            margin-bottom: 18px;
          }

          .admin-stat {
            padding: 15px;
          }

          .admin-stat-icon {
            width: 35px;
            height: 35px;
            margin-bottom: 11px;
            font-size: 17px;
          }

          .admin-stat-label {
            min-height: 32px;
            font-size: 11px;
          }

          .admin-stat-value {
            font-size: 25px;
          }

          .admin-quick-section,
          .admin-orders-section {
            padding: 15px;
            margin-bottom: 18px;
          }

          .admin-section-heading h2 {
            font-size: 17px;
          }

          .admin-quick-actions {
            gap: 9px;
          }

          .admin-quick-action {
            min-height: 95px;
            padding: 13px 10px;
          }

          .admin-quick-action strong {
            font-size: 12px;
          }

          .admin-quick-action span {
            font-size: 11px;
          }

          .admin-order-card {
            padding: 14px;
            margin-bottom: 13px;
          }

          .admin-order-top {
            gap: 10px;
            padding-bottom: 13px;
            margin-bottom: 13px;
          }

          .admin-order-top h3 {
            font-size: 15px;
          }

          .admin-order-top p {
            font-size: 12px;
          }

          .admin-order-price {
            font-size: 17px;
          }

          .admin-order-details {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px 9px;
            padding: 12px;
          }

          .admin-detail-item {
            font-size: 12px;
          }

          .admin-order-item {
            font-size: 12px;
          }

          .admin-customer-info {
            padding: 12px;
          }

          .admin-order-actions {
            align-items: stretch;
            flex-direction: column;
          }

          .admin-order-action-left {
            width: 100%;
          }

          .admin-verify-button,
          .admin-status-select {
            width: 100%;
            min-height: 43px;
          }

          .admin-header-actions {
            width: 100%;
          }

          .admin-header-actions .admin-button {
            width: 100%;
          }
        }

        @media (max-width: 360px) {
          .admin-stats,
          .admin-quick-actions {
            grid-template-columns: 1fr;
          }

          .admin-order-details {
            grid-template-columns: 1fr;
          }

          .admin-stat-label {
            min-height: auto;
          }
        }
      `}</style>

      <main className="admin-main">

        {/* HEADER */}

        <header className="admin-header">
          <div>
            <h1>Dashboard</h1>
            <p>
              Manage your store and monitor your business.
            </p>
          </div>

          <div className="admin-header-actions">
            <button
              className="admin-button admin-button-light"
              onClick={loadDashboard}
              disabled={loading}
            >
              ↻ {loading ? "Refreshing..." : "Refresh Dashboard"}
            </button>
          </div>
        </header>

        {/* WELCOME */}

        <section className="admin-welcome">
          <h2>
            Welcome, {adminInfo.name || "Admin"}!
          </h2>

          <p>
            This is your Imtiaz Trader control panel.
            Manage products, categories, customer orders
            and enquiries from one place.
          </p>
        </section>

        {error && (
          <div className="admin-error">
            {error}
          </div>
        )}

        {/* STATISTICS */}

        <section className="admin-stats">

          <div className="admin-stat">
            <div className="admin-stat-icon">▣</div>
            <div className="admin-stat-label">
              Total Products
            </div>
            <div className="admin-stat-value">
              {loading ? "..." : products}
            </div>
          </div>

          <div className="admin-stat">
            <div className="admin-stat-icon">▤</div>
            <div className="admin-stat-label">
              Total Categories
            </div>
            <div className="admin-stat-value">
              {loading ? "..." : categories}
            </div>
          </div>

          <div className="admin-stat">
            <div className="admin-stat-icon">🛒</div>
            <div className="admin-stat-label">
              Total Orders
            </div>
            <div className="admin-stat-value">
              {loading ? "..." : orders.length}
            </div>
          </div>

          <div className="admin-stat">
            <div className="admin-stat-icon">◷</div>
            <div className="admin-stat-label">
              Pending Orders
            </div>
            <div className="admin-stat-value">
              {loading ? "..." : pendingOrders}
            </div>
          </div>

          <div className="admin-stat">
            <div className="admin-stat-icon">৳</div>
            <div className="admin-stat-label">
              Awaiting Payment Verification
            </div>
            <div className="admin-stat-value">
              {loading ? "..." : awaitingPayments}
            </div>
          </div>

          <div className="admin-stat">
            <div className="admin-stat-icon">✉</div>
            <div className="admin-stat-label">
              New Customer Enquiries
            </div>
            <div className="admin-stat-value">
              {loading ? "..." : newEnquiries}
            </div>
          </div>

        </section>

        {/* QUICK MANAGEMENT */}

        <section className="admin-quick-section">

          <div className="admin-section-heading">
            <h2>Quick Management</h2>
          </div>

          <div className="admin-quick-actions">

            <button
              className="admin-quick-action"
              onClick={() => openPage("/admin/products")}
            >
              <strong>▣ Manage Products</strong>
              <span>
                Add, edit and remove products
              </span>
            </button>

            <button
              className="admin-quick-action"
              onClick={() => openPage("/admin/categories")}
            >
              <strong>▤ Manage Categories</strong>
              <span>
                Organize your store categories
              </span>
            </button>

            <button
              className="admin-quick-action"
              onClick={scrollToOrders}
            >
              <strong>🛒 Manage Orders</strong>
              <span>
                Review and update customer orders
              </span>
            </button>

            <button
              className="admin-quick-action"
              onClick={() => openPage("/admin/enquiries")}
            >
              <strong>✉ Customer Enquiries</strong>
              <span>
                View customer messages
              </span>
            </button>

          </div>
        </section>

        {/* CUSTOMER ORDERS */}

        <section
          className="admin-orders-section"
          id="customer-orders"
        >

          <div className="admin-section-heading">
            <h2>Customer Orders</h2>

            <button
              className="admin-button admin-button-light"
              onClick={loadDashboard}
              disabled={loading}
            >
              ↻ Refresh
            </button>
          </div>

          {loading ? (
            <div className="admin-empty">
              <span className="admin-loading-dot"></span>
              Loading customer orders...
            </div>
          ) : orders.length === 0 ? (
            <div className="admin-empty">
              No customer orders yet.
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order._id}
                className="admin-order-card"
              >

                {/* ORDER HEADER */}

                <div className="admin-order-top">

                  <div className="admin-order-heading">

                    <h3>
                      Order #{order.orderNumber}
                    </h3>

                    <p>
                      Customer: {order.customer?.fullName || "Not provided"}
                    </p>

                    <p>
                      Phone: {order.customer?.phone || "Not provided"}
                    </p>

                    <span className="admin-order-date">
                      {formatDate(order.createdAt)}
                    </span>

                  </div>

                  <div className="admin-order-price">
                    Rs. {formatPrice(order.total)}
                  </div>

                </div>

                {/* ORDER INFORMATION */}

                <div className="admin-order-details">

                  <div className="admin-detail-item">
                    <span className="admin-detail-label">
                      Payment Method
                    </span>
                    <span className="admin-detail-value">
                      {order.paymentMethod || "Not provided"}
                    </span>
                  </div>

                  <div className="admin-detail-item">
                    <span className="admin-detail-label">
                      Payment Status
                    </span>
                    <span
                      className={`admin-status-badge ${getStatusClass(
                        order.paymentStatus
                      )}`}
                    >
                      {order.paymentStatus || "Not provided"}
                    </span>
                  </div>

                  <div className="admin-detail-item">
                    <span className="admin-detail-label">
                      Order Status
                    </span>
                    <span
                      className={`admin-status-badge ${getStatusClass(
                        order.status
                      )}`}
                    >
                      {order.status || "Pending"}
                    </span>
                  </div>

                  {order.paymentReference && (
                    <div className="admin-detail-item admin-reference">
                      <span className="admin-detail-label">
                        Transaction Reference
                      </span>
                      <span className="admin-detail-value">
                        {order.paymentReference}
                      </span>
                    </div>
                  )}

                </div>

                {/* ORDERED ITEMS */}

                <div className="admin-order-items">

                  <strong className="admin-order-items-title">
                    Ordered Items
                  </strong>

                  {order.items?.length > 0 ? (
                    order.items.map((item, index) => (
                      <div
                        className="admin-order-item"
                        key={index}
                      >
                        <span className="admin-order-item-name">
                          {item.productName} × {item.quantity}
                        </span>

                        <span className="admin-order-item-price">
                          Rs.{" "}
                          {formatPrice(
                            Number(item.price) *
                            Number(item.quantity)
                          )}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p>No item details available.</p>
                  )}

                </div>

                {/* CUSTOMER ADDRESS */}

                <div className="admin-customer-info">

                  <strong>Delivery Information</strong>

                  <p>
                    <b>Address:</b>{" "}
                    {order.customer?.address || "Not provided"}
                  </p>

                  <p>
                    <b>City:</b>{" "}
                    {order.customer?.city || "Not provided"}
                  </p>

                </div>

                {/* ORDER ACTIONS */}

                <div className="admin-order-actions">

                  <div className="admin-order-action-left">

                    {order.paymentMethod !== "Cash on Delivery" &&
                      order.paymentStatus !== "Paid" && (
                        <button
                          className="admin-verify-button"
                          onClick={() => verifyPayment(order._id)}
                          disabled={updatingOrder === order._id}
                        >
                          {updatingOrder === order._id
                            ? "Please wait..."
                            : "✓ Verify Payment"}
                        </button>
                      )}

                  </div>

                  <select
                    className="admin-status-select"
                    value={order.status || "Pending"}
                    disabled={updatingOrder === order._id}
                    onChange={(e) =>
                      updateOrderStatus(
                        order._id,
                        e.target.value
                      )
                    }
                  >
                    {[
                      "Pending",
                      "Processing",
                      "Shipped",
                      "Delivered",
                      "Cancelled",
                    ].map((status) => (
                      <option
                        key={status}
                        value={status}
                      >
                        {status}
                      </option>
                    ))}
                  </select>

                </div>

              </div>
            ))
          )}

        </section>

      </main>
    </div>
  );
}

export default AdminDashboard;
