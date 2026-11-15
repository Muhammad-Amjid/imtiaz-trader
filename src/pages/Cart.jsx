
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const SERVER_URL = "http://localhost:5000";

function getImageUrl(product) {
  const image = product.images?.find(Boolean) || product.image;

  if (!image) return "";

  return image.startsWith("http") ? image : `${SERVER_URL}${image}`;
}

function Cart() {
  const {
    cartItems,
    cartCount,
    cartSubtotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    isCartEmpty,
  } = useCart();

  const formatPrice = (price) =>
    `Rs. ${Number(price || 0).toLocaleString("en-PK")}`;

  return (
    <main>
      <section className="bg-dark text-white py-5">
        <div className="container py-3">
          <p className="text-danger fw-bold mb-2">IMTIAZ TRADER</p>
          <h1 className="fw-bold">Shopping Cart</h1>
          <p className="text-light mb-0">
            Review your selected products before checkout.
          </p>
        </div>
      </section>

      <section className="container py-5">
        {isCartEmpty ? (
          <div className="text-center py-5">
            <i className="bi bi-cart-x display-1 text-secondary"></i>
            <h3 className="fw-bold mt-3">Your Cart Is Empty</h3>
            <p className="text-secondary">
              You haven't added any products to your cart yet.
            </p>
            <Link to="/products" className="btn btn-danger">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold mb-0">
                  Cart Items ({cartCount})
                </h4>

                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={clearCart}
                >
                  <i className="bi bi-trash me-2"></i>
                  Clear Cart
                </button>
              </div>

              {cartItems.map((product) => {
                const imageUrl = getImageUrl(product);

                return (
                  <div
                    className="card border-0 shadow-sm mb-3"
                    key={product._id}
                  >
                    <div className="card-body">
                      <div className="row align-items-center g-3">
                        <div className="col-4 col-md-3">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={product.name}
                              className="img-fluid rounded"
                              style={{
                                width: "100%",
                                height: "120px",
                                objectFit: "contain",
                              }}
                            />
                          ) : (
                            <div
                              className="bg-light rounded d-flex justify-content-center align-items-center"
                              style={{ height: "120px" }}
                            >
                              <i className="bi bi-image fs-1 text-secondary"></i>
                            </div>
                          )}
                        </div>

                        <div className="col-8 col-md-5">
                          <p className="text-danger fw-semibold mb-1">
                            {product.brand}
                          </p>

                          <h5 className="fw-bold">{product.name}</h5>

                          <p className="text-danger fw-bold mb-2">
                            {formatPrice(product.price)}
                          </p>

                          <button
                            className="btn btn-link text-danger p-0"
                            onClick={() => removeFromCart(product._id)}
                          >
                            <i className="bi bi-trash me-1"></i>
                            Remove
                          </button>
                        </div>

                        <div className="col-7 col-md-2">
                          <div className="btn-group" role="group">
                            <button
                              className="btn btn-outline-dark"
                              onClick={() => decreaseQuantity(product._id)}
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>

                            <span className="btn btn-light">
                              {product.quantity}
                            </span>

                            <button
                              className="btn btn-outline-dark"
                              onClick={() => increaseQuantity(product._id)}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="col-5 col-md-2 text-end">
                          <strong>
                            {formatPrice(
                              Number(product.price || 0) *
                                product.quantity
                            )}
                          </strong>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="col-lg-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <h4 className="fw-bold mb-4">Order Summary</h4>

                  <div className="d-flex justify-content-between mb-3">
                    <span>Items</span>
                    <span>{cartCount}</span>
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <span>Subtotal</span>
                    <strong>{formatPrice(cartSubtotal)}</strong>
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between mb-4">
                    <h5 className="fw-bold">Total</h5>
                    <h5 className="fw-bold text-danger">
                      {formatPrice(cartSubtotal)}
                    </h5>
                  </div>

                  <Link
                    to="/checkout"
                    className="btn btn-danger btn-lg w-100"
                  >
                    Proceed to Checkout
                    <i className="bi bi-arrow-right ms-2"></i>
                  </Link>

                  <Link
                    to="/products"
                    className="btn btn-outline-dark w-100 mt-2"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default Cart;
