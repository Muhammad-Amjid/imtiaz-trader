
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";

// Automatically uses the current device's hostname
const SERVER_URL = `http://${window.location.hostname}:5000`;
const API_URL = `${SERVER_URL}/api/products`;

const fallbackImage =
  "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800";

function getImageUrl(image) {
  if (!image) return fallbackImage;

  return image.startsWith("http")
    ? image
    : `${SERVER_URL}${image}`;
}

function FeaturedProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error("Unable to load products.");
        }

        const availableProducts = (data.products || []).filter(
          (product) => product.available !== false
        );

        setProducts(availableProducts);
      } catch (error) {
        console.error("Featured products error:", error);
        setError("Unable to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const selectedProducts = products
    .filter((product) => product.featured === true)
    .slice(0, 6);

  const featuredProducts =
    selectedProducts.length > 0
      ? selectedProducts
      : products.slice(0, 6);

  return (
    <ScrollReveal>
      <section className="featured-section">
        <div className="container">
          <div className="text-center featured-heading">
            <p className="text-danger fw-bold">OUR PRODUCTS</p>
            <h2 className="fw-bold">Featured Laptops</h2>
            <p className="text-secondary">
              Explore selected laptops available at Imtiaz Trader.
            </p>
          </div>

          <div className="row g-3 g-md-4 featured-products-grid">
            {loading ? (
              <div className="col-12 text-center">
                <p className="text-secondary">Loading products...</p>
              </div>
            ) : error ? (
              <div className="col-12 text-center">
                <p className="text-danger">{error}</p>
              </div>
            ) : featuredProducts.length > 0 ? (
              featuredProducts.map((product) => {
                const imagePath =
                  product.images?.[0] || product.image;

                return (
                  <div
                    className="col-12 col-sm-6 col-lg-4 featured-product-column"
                    key={product._id}
                  >
                    <div className="card product-card h-100 border-0 shadow-sm overflow-hidden">
                      <div className="featured-image-wrapper">
                        <img
                          src={getImageUrl(imagePath)}
                          alt={product.name}
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src = fallbackImage;
                          }}
                        />
                      </div>

                      <div className="card-body p-3 p-md-4 d-flex flex-column">
                        {product.condition && (
                          <span className="badge bg-danger align-self-start mb-3">
                            {product.condition}
                          </span>
                        )}

                        <h5 className="fw-bold featured-product-name">
                          {product.name}
                        </h5>

                        <p className="text-secondary featured-product-description">
                          {product.description}
                        </p>

                        <button
                          type="button"
                          className="btn btn-outline-danger w-100 mt-auto"
                          onClick={() =>
                            navigate(`/product/${product._id}`)
                          }
                        >
                          View Details
                          <i className="bi bi-arrow-right ms-2"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-12 text-center">
                <p className="text-secondary">
                  New featured products will be available soon.
                </p>
              </div>
            )}
          </div>

          <div className="text-center featured-all-button">
            <button
              type="button"
              className="btn btn-danger px-4"
              onClick={() => navigate("/products")}
            >
              View All Products
            </button>
          </div>
        </div>

        <style>{`
          .featured-section {
            padding: 60px 0;
            width: 100%;
            overflow: hidden;
            background: #ffffff;
          }

          .featured-heading {
            margin-bottom: 40px;
          }

          .featured-heading h2 {
            color: #171717;
            font-size: clamp(26px, 3vw, 35px);
          }

          .featured-heading p:last-child {
            font-size: 16px;
          }

          .product-card {
            border-radius: 12px;
            background: #ffffff;
            transition: transform 0.3s ease,
                        box-shadow 0.3s ease;
          }

          .product-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 12px 25px rgba(0,0,0,0.10) !important;
          }

          .featured-image-wrapper {
            width: 100%;
            height: 230px;
            padding: 15px;
            background: #f8f8f8;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }

          .featured-image-wrapper img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            transition: transform 0.4s ease;
          }

          .product-card:hover .featured-image-wrapper img {
            transform: scale(1.05);
          }

          .featured-product-name {
            font-size: 18px;
            line-height: 1.4;
            overflow-wrap: anywhere;
          }

          .featured-product-description {
            font-size: 14px;
            line-height: 1.6;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .featured-all-button {
            margin-top: 35px;
          }

          .featured-all-button button {
            font-weight: 600;
            padding: 11px 25px;
          }

          @media (max-width: 768px) {
            .featured-section {
              padding: 45px 0;
            }

            .featured-heading {
              margin-bottom: 28px;
            }

            .featured-image-wrapper {
              height: 180px;
            }

            .featured-product-name {
              font-size: 16px;
            }

            .featured-all-button {
              margin-top: 25px;
            }
          }

          /* Three product cards per row on phones */
          @media (max-width: 575.98px) {
            .featured-section {
              padding: 30px 0;
            }

            .featured-section .container {
              padding-left: 8px;
              padding-right: 8px;
            }

            .featured-heading {
              margin-bottom: 20px;
            }

            .featured-heading h2 {
              font-size: 23px;
            }

            .featured-heading p:last-child {
              font-size: 12px;
            }

            .featured-products-grid {
              --bs-gutter-x: 8px;
              --bs-gutter-y: 10px;
            }

            .featured-products-grid > .featured-product-column {
              width: 33.333333%;
              flex: 0 0 33.333333%;
              max-width: 33.333333%;
              padding-left: 4px;
              padding-right: 4px;
            }

            .featured-image-wrapper {
              height: 95px;
              padding: 5px;
            }

            .product-card {
              border-radius: 8px;
            }

            .product-card .card-body {
              padding: 7px !important;
            }

            .product-card .badge {
              font-size: 8px;
              padding: 4px 5px;
              margin-bottom: 6px !important;
            }

            .featured-product-name {
              font-size: 11px;
              line-height: 1.3;
              margin-bottom: 5px;
            }

            .featured-product-description {
              font-size: 9px;
              line-height: 1.35;
              -webkit-line-clamp: 2;
              margin-bottom: 7px;
            }

            .product-card .btn {
              font-size: 9px;
              padding: 5px 2px;
              white-space: normal;
              line-height: 1.2;
            }

            .featured-all-button {
              margin-top: 22px;
            }

            .featured-all-button button {
              width: auto;
              font-size: 12px;
              padding: 8px 16px;
            }
          }
        `}</style>
      </section>
    </ScrollReveal>
  );
}

export default FeaturedProducts;
