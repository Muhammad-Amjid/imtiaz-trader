
import React, { useEffect, useMemo, useState } from "react";

const SERVER_URL = "https://imtiaz-trader-api.vercel.app";
const ORDERS_API = `${SERVER_URL}/api/admin/orders`;

const STATUSES = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const token = localStorage.getItem("adminToken");

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch(ORDERS_API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to load orders.");
      }

      setOrders(data.orders || []);
    } catch (error) {
      showMessage(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    if (!token) {
      showMessage("Please log in again.", "error");
      return;
    }

    setUpdatingId(orderId);

    try {
      const response = await fetch(
        `${ORDERS_API}/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to update order.");
      }

      showMessage("Order status updated successfully.");
      await fetchOrders();

      setSelectedOrder((previous) =>
        previous?._id === orderId
          ? { ...previous, status }
          : previous
      );
    } catch (error) {
      showMessage(error.message, "error");
    } finally {
      setUpdatingId(null);
    }
  };

  const verifyPayment = async (order) => {
    if (
      !window.confirm(
        `Confirm that payment for order ${order.orderNumber} has been received?`
      )
    ) {
      return;
    }

    setUpdatingId(order._id);

    try {
      const response = await fetch(
        `${ORDERS_API}/${order._id}/payment`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to verify payment.");
      }

      showMessage("Payment verified successfully.");
      await fetchOrders();

      setSelectedOrder((previous) =>
        previous?._id === order._id
          ? { ...previous, paymentStatus: "Paid" }
          : previous
      );
    } catch (error) {
      showMessage(error.message, "error");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchText = [
        order.orderNumber,
        order.customer?.fullName,
        order.customer?.phone,
        order.customer?.city,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchText.includes(
        search.toLowerCase().trim()
      );

      const matchesStatus =
        statusFilter === "All" || order.status === statusFilter;

      const matchesPayment =
        paymentFilter === "All" ||
        order.paymentStatus === paymentFilter;

      return matchesSearch && matchesStatus && matchesPayment;
    });
  }, [orders, search, statusFilter, paymentFilter]);

  const formatPrice = (price) =>
    `Rs. ${Number(price || 0).toLocaleString("en-PK")}`;

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleString("en-PK", {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "N/A";

  const getStatusClass = (status) =>
    (status || "").toLowerCase().replace(/\s+/g, "-");

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "Pending").length,
    processing: orders.filter((o) => o.status === "Processing").length,
    delivered: orders.filter((o) => o.status === "Delivered").length,
    revenue: orders
      .filter((o) => o.status !== "Cancelled")
      .reduce((sum, order) => sum + Number(order.total || 0), 0),
  };

  return (
    <div className="om-page">
      <style>{`
        .om-page {
          min-height: 100vh;
          padding: 28px;
          background: #f5f6f8;
          color: #222;
        }

        .om-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 15px;
          margin-bottom: 24px;
        }

        .om-eyebrow {
          color: #dc2626;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1.4px;
          margin-bottom: 6px;
        }

        .om-header h1 {
          margin: 0;
          font-size: 27px;
          font-weight: 800;
        }

        .om-header p {
          margin: 7px 0 0;
          color: #777;
          font-size: 13px;
        }

        .om-refresh {
          border: none;
          background: #222;
          color: white;
          border-radius: 7px;
          padding: 11px 17px;
          font-weight: 700;
          cursor: pointer;
        }

        .om-stats {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 14px;
          margin-bottom: 22px;
        }

        .om-stat {
          background: white;
          padding: 17px;
          border: 1px solid #eee;
          border-radius: 10px;
          min-width: 0;
        }

        .om-stat span {
          display: block;
          color: #888;
          font-size: 11px;
          font-weight: 700;
          margin-bottom: 9px;
        }

        .om-stat strong {
          font-size: 21px;
          font-weight: 800;
          overflow-wrap: anywhere;
        }

        .om-card {
          background: white;
          border: 1px solid #eee;
          border-radius: 12px;
          padding: 22px;
          margin-bottom: 22px;
          box-shadow: 0 3px 12px rgba(0,0,0,.03);
        }

        .om-toolbar {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 12px;
          margin-bottom: 18px;
        }

        .om-toolbar input,
        .om-toolbar select {
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
          padding: 11px 12px;
          border: 1px solid #ddd;
          border-radius: 7px;
          background: white;
          font-size: 13px;
          outline: none;
        }

        .om-toolbar input:focus,
        .om-toolbar select:focus {
          border-color: #dc2626;
        }

        .om-results {
          color: #777;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 13px;
        }

        .om-table-wrap {
          width: 100%;
          overflow-x: auto;
        }

        .om-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 850px;
        }

        .om-table th {
          background: #f8f8f8;
          color: #666;
          font-size: 11px;
          text-align: left;
          padding: 13px 12px;
          white-space: nowrap;
        }

        .om-table td {
          border-bottom: 1px solid #eee;
          padding: 14px 12px;
          font-size: 12px;
          vertical-align: middle;
        }

        .om-table tr:hover td {
          background: #fdfdfd;
        }

        .om-order-number {
          color: #dc2626;
          font-weight: 800;
        }

        .om-customer {
          font-weight: 700;
        }

        .om-muted {
          display: block;
          color: #888;
          font-size: 11px;
          margin-top: 4px;
        }

        .om-badge {
          display: inline-block;
          padding: 5px 9px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 800;
          white-space: nowrap;
        }

        .om-badge.pending {
          background: #fef3c7;
          color: #92400e;
        }

        .om-badge.processing {
          background: #dbeafe;
          color: #1d4ed8;
        }

        .om-badge.shipped {
          background: #e0e7ff;
          color: #4338ca;
        }

        .om-badge.delivered,
        .om-badge.paid {
          background: #dcfce7;
          color: #166534;
        }

        .om-badge.cancelled,
        .om-badge.failed {
          background: #fee2e2;
          color: #991b1b;
        }

        .om-badge.awaiting-verification,
        .om-badge.cash-on-delivery {
          background: #f3e8ff;
          color: #7e22ce;
        }

        .om-view {
          border: none;
          background: #222;
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
        }

        .om-empty {
          text-align: center;
          padding: 35px 15px;
          color: #888;
          font-size: 13px;
        }

        .om-alert {
          padding: 12px 15px;
          margin-bottom: 18px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
        }

        .om-alert.success {
          background: #dcfce7;
          color: #166534;
        }

        .om-alert.error {
          background: #fee2e2;
          color: #991b1b;
        }

        .om-detail-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,.5);
          z-index: 1000;
          display: flex;
          justify-content: flex-end;
        }

        .om-detail-panel {
          width: 540px;
          max-width: 100%;
          height: 100%;
          overflow-y: auto;
          background: white;
          padding: 25px;
          box-sizing: border-box;
          box-shadow: -5px 0 25px rgba(0,0,0,.15);
        }

        .om-detail-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          padding-bottom: 18px;
          border-bottom: 1px solid #eee;
          margin-bottom: 20px;
        }

        .om-detail-header h2 {
          font-size: 19px;
          margin: 0;
        }

        .om-close {
          border: none;
          background: #fee2e2;
          color: #991b1b;
          width: 34px;
          height: 34px;
          border-radius: 7px;
          font-size: 20px;
          cursor: pointer;
        }

        .om-detail-section {
          margin-bottom: 23px;
        }

        .om-detail-section h3 {
          font-size: 13px;
          margin: 0 0 13px;
          border-left: 4px solid #dc2626;
          padding-left: 9px;
        }

        .om-detail-line {
          display: flex;
          justify-content: space-between;
          gap: 15px;
          padding: 8px 0;
          border-bottom: 1px solid #f2f2f2;
          font-size: 12px;
        }

        .om-detail-line span:first-child {
          color: #888;
        }

        .om-detail-line strong {
          text-align: right;
          overflow-wrap: anywhere;
        }

        .om-item {
          display: flex;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid #eee;
        }

        .om-item img {
          width: 60px;
          height: 55px;
          object-fit: contain;
          background: #f6f6f6;
          border-radius: 6px;
        }

        .om-item-info {
          flex: 1;
          min-width: 0;
        }

        .om-item-info strong {
          display: block;
          font-size: 12px;
        }

        .om-item-info small {
          display: block;
          color: #888;
          font-size: 11px;
          margin-top: 5px;
        }

        .om-detail-panel select {
          width: 100%;
          padding: 11px;
          border: 1px solid #ddd;
          border-radius: 7px;
          background: white;
          margin-top: 8px;
        }

        .om-payment-button {
          width: 100%;
          border: none;
          padding: 12px;
          margin-top: 12px;
          background: #16a34a;
          color: white;
          border-radius: 7px;
          font-weight: 800;
          cursor: pointer;
        }

        .om-payment-button:disabled {
          opacity: .6;
          cursor: not-allowed;
        }

        @media (max-width: 1050px) {
          .om-stats {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 700px) {
          .om-page {
            padding: 15px 11px;
          }

          .om-header h1 {
            font-size: 22px;
          }

          .om-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 9px;
          }

          .om-stat {
            padding: 13px;
          }

          .om-stat strong {
            font-size: 17px;
          }

          .om-card {
            padding: 13px;
          }

          .om-toolbar {
            grid-template-columns: 1fr;
          }

          .om-detail-panel {
            padding: 17px;
          }
        }
      `}</style>

      <div className="om-header">
        <div>
          <div className="om-eyebrow">IMTIAZ TRADER / ADMIN</div>
          <h1>Order Management</h1>
          <p>Track orders, manage delivery and verify customer payments.</p>
        </div>

        <button className="om-refresh" onClick={fetchOrders}>
          ↻ Refresh Orders
        </button>
      </div>

      {message && (
        <div className={`om-alert ${messageType}`}>
          {message}
        </div>
      )}

      <div className="om-stats">
        <div className="om-stat">
          <span>TOTAL ORDERS</span>
          <strong>{stats.total}</strong>
        </div>

        <div className="om-stat">
          <span>PENDING</span>
          <strong>{stats.pending}</strong>
        </div>

        <div className="om-stat">
          <span>PROCESSING</span>
          <strong>{stats.processing}</strong>
        </div>

        <div className="om-stat">
          <span>DELIVERED</span>
          <strong>{stats.delivered}</strong>
        </div>

        <div className="om-stat">
          <span>ORDER VALUE*</span>
          <strong>{formatPrice(stats.revenue)}</strong>
        </div>
      </div>

      <section className="om-card">
        <div className="om-toolbar">
          <input
            type="search"
            placeholder="Search order number, customer, phone or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Order Statuses</option>
            {STATUSES.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
          >
            <option value="All">All Payment Statuses</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
            <option value="Awaiting Verification">Awaiting Verification</option>
            <option value="Paid">Paid</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        <div className="om-results">
          Showing {filteredOrders.length} of {orders.length} orders
        </div>

        {loading ? (
          <div className="om-empty">Loading orders...</div>
        ) : filteredOrders.length === 0 ? (
          <div className="om-empty">No matching orders found.</div>
        ) : (
          <div className="om-table-wrap">
            <table className="om-table">
              <thead>
                <tr>
                  <th>ORDER</th>
                  <th>CUSTOMER</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAYMENT</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order._id}>
                    <td>
                      <span className="om-order-number">
                        {order.orderNumber}
                      </span>
                      <span className="om-muted">
                        {order.items?.length || 0} item(s)
                      </span>
                    </td>

                    <td>
                      <span className="om-customer">
                        {order.customer?.fullName}
                      </span>
                      <span className="om-muted">
                        {order.customer?.phone}
                      </span>
                    </td>

                    <td>{formatDate(order.createdAt)}</td>

                    <td><strong>{formatPrice(order.total)}</strong></td>

                    <td>
                      <span className={`om-badge ${getStatusClass(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </span>
                    </td>

                    <td>
                      <span className={`om-badge ${getStatusClass(order.status)}`}>
                        {order.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="om-view"
                        onClick={() => setSelectedOrder(order)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {selectedOrder && (
        <div
          className="om-detail-overlay"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="om-detail-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="om-detail-header">
              <div>
                <h2>Order Details</h2>
                <span className="om-muted">
                  {selectedOrder.orderNumber}
                </span>
              </div>

              <button
                className="om-close"
                onClick={() => setSelectedOrder(null)}
              >
                ×
              </button>
            </div>

            <div className="om-detail-section">
              <h3>Customer Information</h3>

              <div className="om-detail-line">
                <span>Customer</span>
                <strong>{selectedOrder.customer?.fullName}</strong>
              </div>

              <div className="om-detail-line">
                <span>Phone</span>
                <strong>{selectedOrder.customer?.phone}</strong>
              </div>

              <div className="om-detail-line">
                <span>City</span>
                <strong>{selectedOrder.customer?.city}</strong>
              </div>

              <div className="om-detail-line">
                <span>Address</span>
                <strong>{selectedOrder.customer?.address}</strong>
              </div>

              <div className="om-detail-line">
                <span>Customer Notes</span>
                <strong>{selectedOrder.customer?.notes || "None"}</strong>
              </div>
            </div>

            <div className="om-detail-section">
              <h3>Ordered Products</h3>

              {selectedOrder.items?.map((item, index) => (
                <div className="om-item" key={`${item.product}-${index}`}>
                  <img
                    src={item.image || "https://placehold.co/100x100?text=Product"}
                    alt={item.productName}
                  />

                  <div className="om-item-info">
                    <strong>{item.productName}</strong>
                    <small>{item.brand}</small>
                    <small>
                      {formatPrice(item.price)} × {item.quantity}
                    </small>
                  </div>

                  <strong>
                    {formatPrice(Number(item.price) * Number(item.quantity))}
                  </strong>
                </div>
              ))}
            </div>

            <div className="om-detail-section">
              <h3>Payment Information</h3>

              <div className="om-detail-line">
                <span>Payment Method</span>
                <strong>{selectedOrder.paymentMethod}</strong>
              </div>

              <div className="om-detail-line">
                <span>Payment Status</span>
                <strong>{selectedOrder.paymentStatus}</strong>
              </div>

              <div className="om-detail-line">
                <span>Payment Reference</span>
                <strong>{selectedOrder.paymentReference || "Not provided"}</strong>
              </div>

              <div className="om-detail-line">
                <span>Order Total</span>
                <strong>{formatPrice(selectedOrder.total)}</strong>
              </div>

              {selectedOrder.paymentStatus === "Awaiting Verification" && (
                <button
                  className="om-payment-button"
                  disabled={updatingId === selectedOrder._id}
                  onClick={() => verifyPayment(selectedOrder)}
                >
                  {updatingId === selectedOrder._id
                    ? "Verifying..."
                    : "Verify Payment"}
                </button>
              )}
            </div>

            <div className="om-detail-section">
              <h3>Manage Order Status</h3>

              <label htmlFor="orderStatus">Update delivery status</label>

              <select
                id="orderStatus"
                value={selectedOrder.status}
                disabled={updatingId === selectedOrder._id}
                onChange={(e) =>
                  updateOrderStatus(selectedOrder._id, e.target.value)
                }
              >
                {STATUSES.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>

              <span className="om-muted">
                Current status: {selectedOrder.status}
              </span>
            </div>

            <div className="om-detail-section">
              <h3>Order Information</h3>

              <div className="om-detail-line">
                <span>Order Date</span>
                <strong>{formatDate(selectedOrder.createdAt)}</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderManagement;
