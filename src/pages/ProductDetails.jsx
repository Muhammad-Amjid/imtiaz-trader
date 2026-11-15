
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

// Automatically uses the current device's hostname
const SERVER_URL = `http://${window.location.hostname}:5000`;
const API_URL = `${SERVER_URL}/api/products`;

const whatsappNumber = "923355703153";
const phoneNumber = "+923355703153";

const fallbackImage =
  "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800";

function getImageUrl(image) {
  if (!image) return fallbackImage;

  return image.startsWith("http")
    ? image
    : `${SERVER_URL}${image.startsWith("/") ? "" : "/"}${image}`;
}

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [cartMessage, setCartMessage] = useState("");
  const [cartError, setCartError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL);
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error("Unable to load products.");
        }

        const foundProduct = (data.products || []).find(
          (item) => String(item._id) === String(id)
        );

        if (!foundProduct) {
          throw new Error("Product not found.");
        }

        if (isMounted) {
          setProduct(foundProduct);
          setActiveImage(0);
          setQuantity(1);
        }
      } catch (err) {
        console.error("Product details error:", err);

        if (isMounted) {
          setError(err.message || "Unable to load this product.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="container text-center py-5">
        <div className="spinner-border text-danger" role="status" />
        <p className="text-secondary mt-3">
          Loading product details...
        </p>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="container text-center py-5">
        <i className="bi bi-box-seam display-1 text-secondary" />

        <h2 className="fw-bold mt-3">
          {error === "Product not found."
            ? "Product Not Found"
            : "Unable to Load Product"}
        </h2>

        <p className="text-secondary">
          {error || "Sorry, this product is not available."}
        </p>

        <Link to="/products" className="btn btn-danger">
          Browse Products
        </Link>
      </main>
    );
  }

  const images = product.images?.length
    ? product.images
    : product.image
      ? [product.image]
      : [];

  const safeActiveImage = images[activeImage] ? activeImage : 0;

  const isAvailable =
    product.available !== false &&
    product.availability !== "Unavailable";

  const handleAddToCart = () => {
    setCartMessage("");
    setCartError(false);

    if (!isAvailable) {
      setCartError(true);
      setCartMessage("Sorry, this product is currently unavailable.");
      return;
    }

    const result = addToCart(product, quantity);

    if (result?.success) {
      setCartMessage(result.message || "Product added to your cart!");
    } else {
      setCartError(true);
      setCartMessage(result?.message || "Unable to add this product.");
    }
  };

  const message = `Hello Imtiaz Trader! I am interested in ${product.name}. Please share more details and availability.`;

  const whatsappLink =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  const specifications = [
    ["Brand", product.brand],
    ["Model", product.name],
    ["Category", product.category],
    ["Processor", product.processor],
    ["Generation", product.generation],
    ["RAM", product.ram],
    ["Storage", product.storage],
    ["Operating System", product.operatingSystem],
    ["Graphics", product.graphics],
    ["Condition", product.condition],
  ];

  return (
    <main className="product-details-page">

      {/* Page Heading */}
      <section className="bg-dark text-white py-4">
        <div className="container">
          <p className="text-danger fw-bold mb-1">
            IMTIAZ TRADER
          </p>
          <h2 className="fw-bold mb-0">Product Details</h2>
        </div>
      </section>

      <section className="container product-details-container">

        {/* Breadcrumb */}
        <nav className="mb-4" aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none">
                Home
              </Link>
            </li>

            <li className="breadcrumb-item">
              <Link to="/products" className="text-decoration-none">
                Products
              </Link>
            </li>

            <li className="breadcrumb-item active">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="row g-4 g-lg-5">

          {/* Product Images */}
          <div className="col-12 col-lg-6">

            <div className="product-main-image">
              {images.length > 0 ? (
                <img
                  src={getImageUrl(images[safeActiveImage])}
                  alt={product.name}
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = fallbackImage;
                  }}
                />
              ) : (
                <div className="text-center text-secondary">
                  <i className="bi bi-laptop display-1" />
                  <p className="mt-3">
                    No product image available.
                  </p>
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="product-thumbnails">
                {images.map((image, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    aria-label={`View product image ${index + 1}`}
                    className={
                      safeActiveImage === index
                        ? "product-thumbnail active"
                        : "product-thumbnail"
                    }
                  >
                    <img
                      src={getImageUrl(image)}
                      alt={`${product.name} view ${index + 1}`}
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = fallbackImage;
                      }}
                    />
                  </button>
                ))}
              </div>
            )}

          </div>

          {/* Product Information */}
          <div className="col-12 col-lg-6">

            <div className="product-info">

              <span className="badge bg-danger mb-3">
                {product.condition || "Contact to confirm"}
              </span>

              <p className="text-danger fw-semibold mb-2">
                {product.brand}
              </p>

              <h1 className="fw-bold product-title">
                {product.name}
              </h1>

              <p className="text-secondary mt-3 product-description">
                {product.description ||
                  "Contact us for more product information."}
              </p>

              <h2 className="text-danger fw-bold my-4 product-price">
                {product.price != null && product.price !== ""
                  ? `Rs. ${Number(product.price).toLocaleString("en-PK")}`
                  : "Contact for Price"}
              </h2>

              <hr />

              {/* Specifications */}
              <h5 className="fw-bold mb-3">
                Product Specifications
              </h5>

              <div className="table-responsive">
                <table className="table table-bordered align-middle product-spec-table">
                  <tbody>
                    {specifications.map(([label, value]) => (
                      <tr key={label}>
                        <th>{label}</th>
                        <td>{value || "Not specified"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <hr />

              {/* Quantity */}
              <h5 className="fw-bold mb-3">Quantity</h5>

              <div className="d-flex align-items-center gap-3 mb-4">
                <button
                  type="button"
                  className="btn btn-outline-dark quantity-btn"
                  onClick={() =>
                    setQuantity((previous) => Math.max(1, previous - 1))
                  }
                  disabled={quantity <= 1}
                >
                  <i className="bi bi-dash-lg" />
                </button>

                <span className="fw-bold fs-5">{quantity}</span>

                <button
                  type="button"
                  className="btn btn-outline-dark quantity-btn"
                  onClick={() =>
                    setQuantity((previous) => Math.min(99, previous + 1))
                  }
                  disabled={quantity >= 99}
                >
                  <i className="bi bi-plus-lg" />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                type="button"
                className="btn btn-danger btn-lg w-100 mb-3"
                onClick={handleAddToCart}
                disabled={!isAvailable}
              >
                <i className="bi bi-cart-plus me-2" />
                {isAvailable ? "Add to Cart" : "Currently Unavailable"}
              </button>

              {cartMessage && (
                <div
                  className={`alert ${
                    cartError ? "alert-danger" : "alert-success"
                  }`}
                  role="alert"
                >
                  <i
                    className={`bi ${
                      cartError
                        ? "bi-exclamation-circle"
                        : "bi-check-circle"
                    } me-2`}
                  />

                  {cartMessage}

                  {!cartError && (
                    <Link to="/cart" className="fw-bold ms-2">
                      View Cart
                    </Link>
                  )}
                </div>
              )}

              {/* WhatsApp */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-success btn-lg w-100 mb-3"
              >
                <i className="bi bi-whatsapp me-2" />
                Enquire on WhatsApp
              </a>

              {/* Call */}
              <a
                href={`tel:${phoneNumber}`}
                className="btn btn-outline-danger btn-lg w-100"
              >
                <i className="bi bi-telephone me-2" />
                Call Now
              </a>

              <p className="text-secondary small mt-3">
                <i className="bi bi-info-circle me-2" />
                Contact Imtiaz Trader to confirm stock, condition and pricing.
              </p>

            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-5">
          <Link to="/products" className="btn btn-outline-dark">
            <i className="bi bi-arrow-left me-2" />
            Back to Products
          </Link>
        </div>

      </section>

      {/* Responsive Styling */}
      <style>{`
        .product-details-container {
          padding-top: 35px;
          padding-bottom: 45px;
        }

        .product-main-image {
          min-height: 350px;
          background: #f8f9fa;
          border-radius: 16px;
          padding: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .product-main-image img {
          width: 100%;
          height: 400px;
          object-fit: contain;
        }

        .product-thumbnails {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 15px;
        }

        .product-thumbnail {
          width: 85px;
          height: 85px;
          padding: 5px;
          border: 1px solid #ddd;
          border-radius: 10px;
          background: white;
          overflow: hidden;
        }

        .product-thumbnail.active {
          border: 2px solid #a5222d;
        }

        .product-thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .product-title {
          font-size: 2rem;
          overflow-wrap: anywhere;
        }

        .product-price {
          font-size: 1.9rem;
        }

        .product-description {
          line-height: 1.7;
        }

        .product-spec-table th {
          width: 35%;
          background: #f8f9fa;
        }

        .product-spec-table td {
          overflow-wrap: anywhere;
        }

        .quantity-btn {
          width: 43px;
          height: 43px;
        }

        @media (max-width: 767px) {
          .product-details-container {
            padding-top: 18px;
            padding-bottom: 25px;
          }

          .product-details-container .breadcrumb {
            font-size: 12px;
            margin-bottom: 15px !important;
            flex-wrap: wrap;
          }

          .product-details-page .row {
            --bs-gutter-y: 18px;
          }

          .product-main-image {
            min-height: 220px;
            padding: 10px;
            border-radius: 12px;
          }

          .product-main-image img {
            height: 230px;
          }

          .product-thumbnails {
            gap: 8px;
            margin-top: 10px;
          }

          .product-thumbnail {
            width: 65px;
            height: 65px;
          }

          .product-title {
            font-size: 1.45rem;
            line-height: 1.3;
          }

          .product-price {
            font-size: 1.55rem;
            margin-top: 18px !important;
            margin-bottom: 18px !important;
          }

          .product-description {
            font-size: 14px;
            line-height: 1.6;
          }

          .product-info h5 {
            font-size: 16px;
          }

          .product-spec-table {
            font-size: 12px;
            margin-bottom: 12px;
          }

          .product-spec-table th,
          .product-spec-table td {
            padding: 8px;
          }

          .product-spec-table th {
            width: 38%;
          }

          .product-details-page .btn-lg {
            font-size: 15px;
            padding: 10px 14px;
          }

          .product-details-page .badge {
            font-size: 11px;
          }

          .quantity-btn {
            width: 40px;
            height: 40px;
            padding: 5px;
          }
        }
      `}</style>

    </main>
  );
}

export default ProductDetails;
