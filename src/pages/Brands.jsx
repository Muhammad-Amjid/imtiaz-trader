
import React from "react";
import { Link, useParams } from "react-router-dom";
import { products } from "../data/products";

const WHATSAPP_NUMBER = "923355703153";

function Brands() {
  const { brandName } = useParams();

  const selectedBrand = decodeURIComponent(brandName || "")
    .replace(/-/g, " ")
    .toLowerCase();

  const brandProducts = products.filter(
    (product) =>
      product.brand?.toLowerCase() === selectedBrand
  );

  const displayBrand =
    brandProducts[0]?.brand ||
    selectedBrand.replace(/\b\w/g, (letter) => letter.toUpperCase());

  return (
    <main>
      <section className="bg-dark text-white py-5">
        <div className="container">
          <p className="text-danger fw-bold mb-2">
            IMTIAZ TRADER
          </p>
          <h1 className="fw-bold">{displayBrand}</h1>
          <p className="text-white-50 mb-0">
            Explore our {displayBrand} products.
          </p>
        </div>
      </section>

      <section className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <h2 className="fw-bold mb-0">Available Products</h2>
          <span className="text-secondary">
            {brandProducts.length} Products
          </span>
        </div>

        {brandProducts.length > 0 ? (
          <div className="row g-4">
            {brandProducts.map((product) => {
              const message = `Hello Imtiaz Trader, I am interested in ${product.name}. Please share more details.`;

              return (
                <div className="col-12 col-md-6 col-lg-4" key={product.id}>
                  <div className="card h-100 border-0 shadow-sm">
                    <div
                      className="bg-light p-3 d-flex align-items-center justify-content-center"
                      style={{ height: "230px" }}
                    >
                      <img
                        src={product.image || "/products/laptop-placeholder.jpeg"}
                        alt={product.name}
                        className="img-fluid"
                        style={{
                          maxHeight: "200px",
                          width: "100%",
                          objectFit: "contain",
                        }}
                        onError={(event) => {
                          event.currentTarget.src =
                            "/products/laptop-placeholder.jpeg";
                        }}
                      />
                    </div>

                    <div className="card-body d-flex flex-column">
                      <span className="text-danger fw-semibold small">
                        {product.brand}
                      </span>

                      <h5 className="fw-bold mt-2">
                        {product.name}
                      </h5>

                      <p className="text-secondary small">
                        {product.description || "Contact us for details."}
                      </p>

                      <p className="fw-bold">
                        {product.price != null
                          ? `Rs. ${Number(product.price).toLocaleString("en-PK")}`
                          : "Contact for Price"}
                      </p>

                      <div className="mt-auto">
                        <Link
                          to={`/product/${product.id}`}
                          className="btn btn-outline-dark w-100 mb-2"
                        >
                          View Details
                        </Link>

                        <a
                          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-danger w-100"
                        >
                          <i className="bi bi-whatsapp me-2"></i>
                          Enquire Now
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
            <i className="bi bi-laptop display-1 text-secondary"></i>
            <h3 className="fw-bold mt-3">
              Products Coming Soon
            </h3>
            <p className="text-secondary">
              We are updating our {displayBrand} collection.
            </p>
            <Link to="/products" className="btn btn-danger">
              Explore All Products
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}

export default Brands;
