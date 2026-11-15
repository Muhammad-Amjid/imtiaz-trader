
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ORDER_API = "http://localhost:5000/api/orders";
const WHATSAPP_NUMBER = "923355703153";

const PAYMENT_DETAILS = {
  bank: {
    title: "JAWAD IQBAL",
    bank: "UBL Bank",
    iban: "PK12UNIL0109000321865973",
  },
  easypaisa: {
    accountName: "JAWAD IQBAL",
    number: "0335 5703153",
  },
};

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, cartSubtotal, clearCart } = useCart();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [paymentReference, setPaymentReference] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [completedOrder, setCompletedOrder] = useState(null);

  const subtotal = Number(cartSubtotal || 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (
      !form.fullName.trim() ||
      !form.phone.trim() ||
      !form.address.trim() ||
      !form.city.trim()
    ) {
      setError("Please complete all required delivery fields.");
      return false;
    }

    if (!/^[0-9+\-\s()]{7,20}$/.test(form.phone.trim())) {
      setError("Please enter a valid phone number.");
      return false;
    }

    return true;
  };

  const buildWhatsAppMessage = () => {
    const lines = [
      "Hello Imtiaz Trader, I want to place an order:",
      "",
      ...cartItems.map(
        (item) =>
          `${item.name || item.productName} x ${item.quantity} = Rs. ${
            Number(item.price || 0) * item.quantity
          }`
      ),
      "",
      `Subtotal: Rs. ${subtotal.toLocaleString("en-PK")}`,
      "",
      `Name: ${form.fullName}`,
      `Phone: ${form.phone}`,
      `Address: ${form.address}`,
      `City: ${form.city}`,
      `Payment method: ${paymentMethod}`,
      `Notes: ${form.notes || "None"}`,
    ];

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      lines.join("\n")
    )}`;
  };

  const handleWhatsAppOrder = () => {
    if (!validateForm()) return;

    window.open(buildWhatsAppMessage(), "_blank", "noopener,noreferrer");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    if (!cartItems.length) {
      setError("Your cart is empty.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(ORDER_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: form,
          paymentMethod,
          paymentReference,
          items: cartItems.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to place your order.");
      }

      setCompletedOrder(data.order);
      clearCart();
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (completedOrder) {
    return (
      <div className="container py-5">
        <div className="card shadow-sm mx-auto p-4 text-center" style={{ maxWidth: 650 }}>
          <i className="bi bi-check-circle-fill text-success display-3 mb-3"></i>
          <h2>Order Placed Successfully!</h2>
          <p className="text-muted">Thank you for shopping with Imtiaz Trader.</p>

          <h5>Order Number: {completedOrder.orderNumber}</h5>
          <h4 className="text-danger">
            Rs. {Number(completedOrder.total).toLocaleString("en-PK")}
          </h4>

          <p>
            Payment method: <strong>{completedOrder.paymentMethod}</strong>
          </p>
          <p>
            Payment status: <strong>{completedOrder.paymentStatus}</strong>
          </p>
          <p>
            Order status: <strong>{completedOrder.status}</strong>
          </p>

          {completedOrder.paymentMethod === "Bank Transfer" && (
            <div className="alert alert-info text-start">
              Please transfer payment to:
              <br />
              Bank: UBL
              <br />
              Account title: JAWAD IQBAL
              <br />
              IBAN: {PAYMENT_DETAILS.bank.iban}
            </div>
          )}

          {completedOrder.paymentMethod === "Easypaisa" && (
            <div className="alert alert-info text-start">
              Easypaisa number: {PAYMENT_DETAILS.easypaisa.number}
              <br />
              Account title: JAWAD IQBAL
            </div>
          )}

          <p className="small text-muted">
            For bank transfer or Easypaisa, your payment will be confirmed
            after we manually verify receipt.
          </p>

          <Link to="/products" className="btn btn-danger mt-2">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (!cartItems.length) {
    return (
      <div className="container text-center py-5">
        <h2>Your cart is empty</h2>
        <Link to="/products" className="btn btn-danger mt-3">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Checkout</h2>

      <div className="row g-4">
        <div className="col-lg-7">
          <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
            <h4 className="mb-3">Delivery Information</h4>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="mb-3">
              <label className="form-label">Full Name *</label>
              <input
                className="form-control"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone Number *</label>
              <input
                className="form-control"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="03XXXXXXXXX"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Delivery Address *</label>
              <textarea
                className="form-control"
                name="address"
                rows="3"
                value={form.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">City *</label>
              <input
                className="form-control"
                name="city"
                value={form.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Additional Notes</label>
              <textarea
                className="form-control"
                name="notes"
                rows="2"
                value={form.notes}
                onChange={handleChange}
              />
            </div>

            <hr />

            <h4 className="mb-3">Select Payment Method</h4>

            <div className="form-check border rounded p-3 mb-2">
              <input
                className="form-check-input ms-0 me-2"
                type="radio"
                id="cod"
                name="paymentMethod"
                value="Cash on Delivery"
                checked={paymentMethod === "Cash on Delivery"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label fw-semibold" htmlFor="cod">
                Cash on Delivery
              </label>
              <div className="small text-muted ms-4">
                Pay when your order is delivered.
              </div>
            </div>

            <div className="form-check border rounded p-3 mb-2">
              <input
                className="form-check-input ms-0 me-2"
                type="radio"
                id="bank"
                name="paymentMethod"
                value="Bank Transfer"
                checked={paymentMethod === "Bank Transfer"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label fw-semibold" htmlFor="bank">
                UBL Bank Transfer
              </label>

              {paymentMethod === "Bank Transfer" && (
                <div className="alert alert-light border mt-3 mb-0 ms-4">
                  <strong>Bank:</strong> UBL Bank
                  <br />
                  <strong>Account title:</strong> JAWAD IQBAL
                  <br />
                  <strong>IBAN:</strong> {PAYMENT_DETAILS.bank.iban}
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary ms-2 mt-2"
                    onClick={() =>
                      navigator.clipboard.writeText(PAYMENT_DETAILS.bank.iban)
                    }
                  >
                    Copy IBAN
                  </button>
                </div>
              )}
            </div>

            <div className="form-check border rounded p-3 mb-2">
              <input
                className="form-check-input ms-0 me-2"
                type="radio"
                id="easypaisa"
                name="paymentMethod"
                value="Easypaisa"
                checked={paymentMethod === "Easypaisa"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label fw-semibold" htmlFor="easypaisa">
                Easypaisa
              </label>

              {paymentMethod === "Easypaisa" && (
                <div className="alert alert-light border mt-3 mb-0 ms-4">
                  <strong>Account title:</strong> JAWAD IQBAL
                  <br />
                  <strong>Easypaisa number:</strong>{" "}
                  {PAYMENT_DETAILS.easypaisa.number}
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary ms-2 mt-2"
                    onClick={() =>
                      navigator.clipboard.writeText("03355703153")
                    }
                  >
                    Copy Number
                  </button>
                </div>
              )}
            </div>

            {(paymentMethod === "Bank Transfer" ||
              paymentMethod === "Easypaisa") && (
              <div className="mb-3 mt-3">
                <label className="form-label">
                  Transaction Reference (optional)
                </label>
                <input
                  className="form-control"
                  value={paymentReference}
                  onChange={(e) => setPaymentReference(e.target.value)}
                  placeholder="Enter transaction ID if already paid"
                  maxLength="100"
                />
                <small className="text-muted">
                  Your payment remains unverified until we confirm receipt.
                </small>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-danger btn-lg w-100 mt-3"
              disabled={loading}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>

            <button
              type="button"
              className="btn btn-outline-success btn-sm mt-2 align-self-center"
              onClick={handleWhatsAppOrder}
            >
              <i className="bi bi-whatsapp me-1"></i>
              Place Order via WhatsApp
            </button>
          </form>
        </div>

        <div className="col-lg-5">
          <div className="card p-4 shadow-sm">
            <h4 className="mb-3">Order Summary</h4>

            {cartItems.map((item) => (
              <div
                key={item._id}
                className="d-flex justify-content-between border-bottom py-2"
              >
                <div>
                  <strong>{item.name || item.productName}</strong>
                  <div className="small text-muted">
                    Quantity: {item.quantity}
                  </div>
                </div>

                <span>
                  Rs.{" "}
                  {(
                    Number(item.price || 0) * item.quantity
                  ).toLocaleString("en-PK")}
                </span>
              </div>
            ))}

            <div className="d-flex justify-content-between mt-3">
              <strong>Subtotal</strong>
              <strong>Rs. {subtotal.toLocaleString("en-PK")}</strong>
            </div>

            <div className="d-flex justify-content-between mt-2">
              <span>Delivery Charges</span>
              <span>To be confirmed</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between">
              <h5>Total</h5>
              <h5 className="text-danger">
                Rs. {subtotal.toLocaleString("en-PK")}
              </h5>
            </div>

            <small className="text-muted mt-2">
              Delivery charges, if applicable, will be confirmed by our team.
            </small>

            <Link to="/cart" className="btn btn-outline-secondary mt-3">
              Back to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
