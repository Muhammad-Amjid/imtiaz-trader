
import React from "react";
import { Link, useParams } from "react-router-dom";
import { products } from "../data/products";

const WHATSAPP_NUMBER = "923495092195";

function Brands() {
  const { brandName } = useParams();

  const selectedBrand = decodeURIComponent(brandName || "")
    .replace(/-/g, " ")
    .toLowerCase();

  const brandProducts = products.filter(
    (product) =>
      product.brand?.toLowerCase() === selectedBrand
  );

  const getWhatsAppLink = (product) => {
    const message = `Hello Imtiaz Trader! I am interested in ${product.name}. Please share more details and availability.`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <main>
      <section className="bg-dark text-white py-5">
        <div className="container py-3">
          <p className="text-danger fw-bold mb-2">
            IMTIAZ TRADER
          </p>

          <h1 className="fw-bold text-capitalize">
            {selectedBrand} Products
          </h1>

          <p className="text-light mb-0">
            Explore products from your favourite brand.
          </p>
        </div>
      </section>

      <section className="container py-5">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
          <h3 className="fw-bold mb-0">
            {selectedBrand} Products
          </h3>

          <span className="text-secondary">
            {brandProducts.length} Products
          </span>
        </div>

        {brandProducts.length > 0 ? (
          <div className="row g-4">
            {brandProducts.map((product) => {
              const price =
                product.price !== "" && product.price != null
                  ? Number(product.price)
                  : null;

              const originalPrice =
                product.originalPrice !== "" &&
                product.originalPrice != null
                  ? Number(product.originalPrice)
                  : null;

              const hasValidPrice =
                price !== null &&
                Number.isFinite(price) &&
                price >= 0;

              const hasDiscount =
                hasValidPrice &&
                originalPrice !== null &&
                Number.isFinite(originalPrice) &&
                originalPrice > price;

              const discountPercentage = hasDiscount
                ? Math.round(
                    ((originalPrice - price) / originalPrice) * 100
                  )
                : 0;

              const savings = hasDiscount
                ? originalPrice - price
                : 0;

              return (
                <div
                  className="col-12 col-sm-6 col-lg-4"
                  key={product.id}
                >
                  <div className="card product-card h-100 shadow-sm border-0 overflow-hidden">
                    <div
                      className="bg-light position-relative d-flex justify-content-center align-items-center"
                      style={{ height: "240px" }}
                    >
                      <img
                        src={
                          product.images?.[0] ||
                          product.image ||
                          "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400"
                        }
                        alt={product.name}
                        className="img-fluid"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          padding: "15px",
                        }}
                      />

                      {hasDiscount && (
                        <span
                          className="badge bg-danger position-absolute top-0 start-0 m-3"
                          style={{ fontSize: "13px", padding: "8px 10px" }}
                        >
                          {discountPercentage}% OFF
                        </span>
                      )}
                    </div>

                    <div className="card-body p-4 d-flex flex-column">
                      <p className="text-danger fw-semibold mb-2">
                        {product.brand}
                      </p>

                      <h5 className="fw-bold">
                        {product.name}
                      </h5>

                      <p className="text-secondary">
                        {product.description}
                      </p>

                      <div className="mb-3">
                        {hasValidPrice ? (
                          <>
                            <h5 className="text-danger fw-bold mb-1">
                              Rs. {price.toLocaleString("en-PK")}
                            </h5>

                            {hasDiscount && (
                              <>
                                <p className="text-secondary mb-1">
                                  <del>
                                    Rs. {originalPrice.toLocaleString("en-PK")}
                                  </del>
                                </p>

                                <small className="text-success fw-semibold">
                                  You save Rs. {savings.toLocaleString("en-PK")}
                                </small>
                              </>
                            )}
                          </>
                        ) : (
                          <h5 className="text-danger fw-bold">
                            Contact for Price
                          </h5>
                        )}
                      </div>

                      <div className="mt-auto">
                        <Link
                          to={`/product/${product.id}`}
                          className="btn btn-danger w-100 mb-2"
                        >
                          View Details
                        </Link>

                        <a
                          href={getWhatsAppLink(product)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-success w-100"
                        >
                          <i className="bi bi-whatsapp me-2"></i>
                          WhatsApp Enquiry
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-5">
            <h4 className="fw-bold">
              No Products Found
            </h4>

            <p className="text-secondary">
              No products are currently available for this brand.
            </p>

            <Link to="/products" className="btn btn-danger">
              Browse All Products
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}

export default Brands;
