
import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

const API_URL = "http://localhost:5000/api/products";
const SERVER_URL = "http://localhost:5000";
const whatsappNumber = "923355703153";

function getImageUrl(product) {
  const image = product.images?.find(Boolean) || product.image;

  if (!image) return "";

  return image.startsWith("http") ? image : `${SERVER_URL}${image}`;
}

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim() || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Unable to load products.");
        }

        const data = await response.json();

        if (data.success && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("Search products error:", err);
        setError("Unable to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Search products
  const filteredProducts = useMemo(() => {
    const normalizedQuery = query
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ");

    if (!normalizedQuery) return [];

    return products.filter((product) => {
      if (product.available === false) return false;

      const searchableText = [
        product.name,
        product.brand,
        product.category,
        product.processor,
        product.generation,
        product.ram,
        product.operatingSystem,
        product.storage,
        product.graphics,
        product.condition,
        product.availability,
        product.description,
        product.price,
      ]
        .filter((value) => value !== null && value !== undefined)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [products, query]);

  // WhatsApp enquiry link
  const getWhatsAppLink = (product) => {
    const message = `Hello Imtiaz Trader! I am interested in ${product.name}. Please share more details and availability.`;

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
  };

  return (
    <main>
      {/* Search Page Header */}
      <section className="bg-dark text-white py-5">
        <div className="container py-3">
          <p className="text-danger fw-bold mb-2">
            IMTIAZ TRADER
          </p>

          <h1 className="fw-bold">Search Products</h1>

          <p className="text-light mb-0">
            Find the laptop or technology product you are looking for.
          </p>
        </div>
      </section>

      <section className="container py-5">
        {/* Search Information */}
        <div className="mb-4">
          <h3 className="fw-bold">Search Results</h3>

          {query ? (
            <p className="text-secondary">
              Results for: <strong>"{query}"</strong>
              {!loading && !error && (
                <span className="ms-2">
                  ({filteredProducts.length}{" "}
                  {filteredProducts.length === 1 ? "product" : "products"})
                </span>
              )}
            </p>
          ) : (
            <p className="text-secondary">
              Enter a product name or brand in the search bar.
            </p>
          )}
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-secondary mt-3">Loading products...</p>
          </div>
        ) : error ? (
          /* Error */
          <div className="text-center py-5">
            <h4 className="fw-bold">Something went wrong</h4>
            <p className="text-secondary">{error}</p>
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            {/* Products */}
            {filteredProducts.length > 0 && query ? (
              <div className="row g-4">
                {filteredProducts.map((product) => {
                  const productId = product._id || product.id;
                  const imageUrl = getImageUrl(product);

                  return (
                    <div
                      className="col-12 col-sm-6 col-lg-4"
                      key={productId}
                    >
                      <div className="card product-card h-100 shadow-sm border-0 overflow-hidden">
                        <div
                          className="bg-light d-flex justify-content-center align-items-center"
                          style={{ height: "240px" }}
                        >
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={product.name}
                              className="img-fluid"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                                padding: "15px",
                              }}
                            />
                          ) : (
                            <div className="text-center text-secondary">
                              <i className="bi bi-image display-3"></i>
                              <p className="mb-0">No Image Available</p>
                            </div>
                          )}
                        </div>

                        <div className="card-body p-4 d-flex flex-column">
                          <span className="badge bg-danger align-self-start mb-3">
                            {product.condition || "Contact to confirm"}
                          </span>

                          <p className="text-danger fw-semibold mb-2">
                            {product.brand}
                          </p>

                          <h5 className="fw-bold">{product.name}</h5>

                          <p className="text-secondary mb-2">
                            <i className="bi bi-cpu me-2 text-danger"></i>
                            {product.processor || "Processor not specified"}
                          </p>

                          <p className="text-secondary mb-3">
                            <i className="bi bi-memory me-2 text-danger"></i>
                            RAM: {product.ram || "Not specified"}
                          </p>

                          <h5 className="text-danger fw-bold mb-3">
                            {product.price != null && product.price !== ""
                              ? `Rs. ${Number(product.price).toLocaleString(
                                  "en-PK"
                                )}`
                              : "Contact for Price"}
                          </h5>

                          <div className="mt-auto">
                            <Link
                              to={`/product/${productId}`}
                              className="btn btn-danger w-100 mb-2"
                            >
                              View Details
                            </Link>

                            <a
                              href={getWhatsAppLink(product)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-success w-100 mb-2"
                            >
                              <i className="bi bi-whatsapp me-2"></i>
                              WhatsApp Enquiry
                            </a>

                            <Link
                              to={`/brand/${encodeURIComponent(
                                (product.brand || "").toLowerCase()
                              )}`}
                              className="btn btn-outline-dark w-100"
                            >
                              View Brand Products
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* No Products Found */
              <div className="text-center py-5">
                <i className="bi bi-search display-3 text-secondary"></i>

                <h4 className="fw-bold mt-3">
                  {query ? "No Products Found" : "Start Your Search"}
                </h4>

                <p className="text-secondary">
                  {query
                    ? `We couldn't find a product matching "${query}". Please try another name or brand.`
                    : "Use the search bar above to find available products."}
                </p>

                <Link to="/products" className="btn btn-danger">
                  Browse All Products
                </Link>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default Search;
