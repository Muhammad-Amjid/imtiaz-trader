
import React, { useEffect, useMemo, useState } from "react";

const API = "https://imtiaz-trader-api.vercel.app/api/admin/orders";

export default function CustomerManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.error("Customer loading error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const customers = useMemo(() => {
    const customerMap = new Map();

    orders.forEach((order) => {
      const customer = order.customer || {};
      const phone = customer.phone || "No phone";

      if (!customerMap.has(phone)) {
        customerMap.set(phone, {
          name: customer.fullName || "Unknown",
          phone,
          address: customer.address || "",
          city: customer.city || "",
          orders: [],
          totalSpent: 0,
          lastOrder: order.createdAt,
        });
      }

      const existing = customerMap.get(phone);

      existing.orders.push(order);

      if (order.status !== "Cancelled") {
        existing.totalSpent += Number(order.total || 0);
      }

      if (
        new Date(order.createdAt) > new Date(existing.lastOrder)
      ) {
        existing.lastOrder = order.createdAt;
        existing.name = customer.fullName || existing.name;
        existing.address = customer.address || existing.address;
        existing.city = customer.city || existing.city;
      }
    });

    return Array.from(customerMap.values()).sort(
      (a, b) => new Date(b.lastOrder) - new Date(a.lastOrder)
    );
  }, [orders]);

  const filteredCustomers = customers.filter((customer) => {
    const value = search.toLowerCase();

    return (
      customer.name.toLowerCase().includes(value) ||
      customer.phone.toLowerCase().includes(value) ||
      customer.city.toLowerCase().includes(value)
    );
  });

  const totalSpent = customers.reduce(
    (sum, customer) => sum + customer.totalSpent,
    0
  );

  const formatPrice = (price) =>
    `Rs. ${Number(price || 0).toLocaleString("en-PK")}`;

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-PK")
      : "—";

  return (
    <div className="customers-page">
      <style>{`
        .customers-page {
          padding: 30px;
          color: #222;
          font-family: Arial, sans-serif;
        }

        .customers-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          margin-bottom: 25px;
          flex-wrap: wrap;
        }

        .customers-header h1 {
          margin: 0 0 7px;
          font-size: 27px;
        }

        .customers-header p {
          margin: 0;
          color: #777;
          font-size: 14px;
        }

        .customers-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 17px;
          margin-bottom: 25px;
        }

        .customer-stat {
          background: white;
          border: 1px solid #eee;
          border-radius: 10px;
          padding: 20px;
        }

        .customer-stat span {
          display: block;
          color: #777;
          font-size: 13px;
          margin-bottom: 10px;
        }

        .customer-stat strong {
          font-size: 23px;
        }

        .customers-toolbar {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 18px;
          flex-wrap: wrap;
        }

        .customers-search {
          width: 100%;
          max-width: 380px;
          padding: 12px 14px;
          border: 1px solid #ddd;
          border-radius: 7px;
          outline: none;
          font-size: 14px;
        }

        .customers-search:focus {
          border-color: #dc2626;
        }

        .customers-table-wrap {
          background: white;
          border: 1px solid #eee;
          border-radius: 10px;
          overflow-x: auto;
        }

        .customers-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 750px;
        }

        .customers-table th {
          background: #f8f8f8;
          color: #666;
          font-size: 12px;
          text-transform: uppercase;
          text-align: left;
          padding: 15px;
        }

        .customers-table td {
          padding: 16px 15px;
          border-top: 1px solid #eee;
          font-size: 13px;
        }

        .customer-name {
          font-weight: bold;
          color: #222;
        }

        .customer-muted {
          color: #888;
          font-size: 12px;
          margin-top: 5px;
        }

        .customer-view-btn {
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 5px;
          padding: 8px 12px;
          cursor: pointer;
          font-size: 12px;
        }

        .customer-view-btn:hover {
          background: #dc2626;
          color: white;
          border-color: #dc2626;
        }

        .customer-empty {
          text-align: center;
          padding: 45px 15px;
          color: #888;
        }

        .customer-modal-bg {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,.5);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 15px;
          z-index: 500;
        }

        .customer-modal {
          background: white;
          width: 100%;
          max-width: 650px;
          max-height: 85vh;
          overflow-y: auto;
          border-radius: 12px;
          padding: 25px;
        }

        .customer-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .customer-modal-header h2 {
          margin: 0;
          font-size: 21px;
        }

        .customer-close {
          border: none;
          background: #eee;
          border-radius: 6px;
          padding: 8px 12px;
          cursor: pointer;
        }

        .customer-info {
          background: #f8f8f8;
          border-radius: 8px;
          padding: 15px;
          line-height: 1.9;
          font-size: 14px;
          margin-bottom: 20px;
        }

        .customer-history-title {
          margin-bottom: 12px;
        }

        .customer-order {
          border: 1px solid #eee;
          border-radius: 8px;
          padding: 13px;
          margin-bottom: 10px;
          font-size: 13px;
        }

        .customer-order-top {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 8px;
        }

        .customer-order small {
          color: #777;
        }

        @media (max-width: 700px) {
          .customers-page {
            padding: 18px 12px;
          }

          .customers-stats {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .customers-header h1 {
            font-size: 23px;
          }

          .customer-stat {
            padding: 15px;
          }

          .customer-stat strong {
            font-size: 20px;
          }
        }
      `}</style>

      <div className="customers-header">
        <div>
          <h1>Customers</h1>
          <p>Manage your customers and view their order history.</p>
        </div>
      </div>

      <div className="customers-stats">
        <div className="customer-stat">
          <span>Total Customers</span>
          <strong>{customers.length}</strong>
        </div>

        <div className="customer-stat">
          <span>Total Orders</span>
          <strong>{orders.length}</strong>
        </div>

        <div className="customer-stat">
          <span>Customer Order Value</span>
          <strong>{formatPrice(totalSpent)}</strong>
        </div>
      </div>

      <div className="customers-toolbar">
        <input
          className="customers-search"
          type="text"
          placeholder="Search by name, phone or city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="customers-table-wrap">
        <table className="customers-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Phone</th>
              <th>City</th>
              <th>Total Orders</th>
              <th>Total Spending</th>
              <th>Last Order</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="customer-empty">
                  Loading customers...
                </td>
              </tr>
            ) : filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan="7" className="customer-empty">
                  No customers found.
                </td>
              </tr>
            ) : (
              filteredCustomers.map((customer) => (
                <tr key={customer.phone}>
                  <td>
                    <div className="customer-name">
                      {customer.name}
                    </div>
                  </td>

                  <td>{customer.phone}</td>
                  <td>{customer.city || "—"}</td>
                  <td>{customer.orders.length}</td>
                  <td>{formatPrice(customer.totalSpent)}</td>
                  <td>{formatDate(customer.lastOrder)}</td>

                  <td>
                    <button
                      className="customer-view-btn"
                      onClick={() => setSelectedCustomer(customer)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedCustomer && (
        <div
          className="customer-modal-bg"
          onClick={() => setSelectedCustomer(null)}
        >
          <div
            className="customer-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="customer-modal-header">
              <h2>Customer Details</h2>

              <button
                className="customer-close"
                onClick={() => setSelectedCustomer(null)}
              >
                ✕
              </button>
            </div>

            <div className="customer-info">
              <strong>Name:</strong> {selectedCustomer.name}<br />
              <strong>Phone:</strong> {selectedCustomer.phone}<br />
              <strong>City:</strong> {selectedCustomer.city || "—"}<br />
              <strong>Address:</strong> {selectedCustomer.address || "—"}<br />
              <strong>Total Orders:</strong> {selectedCustomer.orders.length}<br />
              <strong>Total Spending:</strong> {formatPrice(selectedCustomer.totalSpent)}
            </div>

            <h3 className="customer-history-title">Order History</h3>

            {selectedCustomer.orders.map((order) => (
              <div className="customer-order" key={order._id}>
                <div className="customer-order-top">
                  <strong>{order.orderNumber}</strong>
                  <strong>{formatPrice(order.total)}</strong>
                </div>

                <small>
                  {formatDate(order.createdAt)} · {order.status}
                </small>

                <div style={{ marginTop: 8 }}>
                  {order.items?.map((item, index) => (
                    <div key={index}>
                      {item.productName} × {item.quantity}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
