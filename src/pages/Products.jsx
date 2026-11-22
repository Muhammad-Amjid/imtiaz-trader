
import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

const SERVER_URL = "https://imtiaz-trader-api.vercel.app";
const API_URL = `${SERVER_URL}/api/products`;
const CATEGORY_API = `${SERVER_URL}/api/categories`;
const PLACEHOLDER = "/products/laptop-placeholder.jpeg";

function getImageUrl(image) {
  if (!image) return PLACEHOLDER;

  return image.startsWith("http")
    ? image
    : `${SERVER_URL}${image.startsWith("/") ? "" : "/"}${image}`;
}

function formatPrice(price) {
  return `Rs. ${Number(price).toLocaleString("en-PK")}`;
}

function getDiscount(product) {
  const originalPrice = Number(product.originalPrice);
  const sellingPrice = Number(product.price);

  if (
    !Number.isFinite(originalPrice) ||
    !Number.isFinite(sellingPrice) ||
    originalPrice <= 0 ||
    sellingPrice < 0 ||
    sellingPrice >= originalPrice
  ) {
    return null;
  }

  return {
    originalPrice,
    sellingPrice,
    percentage: Math.round(
      ((originalPrice - sellingPrice) / originalPrice) * 100
    ),
  };
}

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "";

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addedProduct, setAddedProduct] = useState("");

  const { addToCart, cartItems } = useCart();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const [productResponse, categoryResponse] = await Promise.all([
          fetch(API_URL),
          fetch(CATEGORY_API),
        ]);

        const productData = await productResponse.json();
        const categoryData = await categoryResponse.json();

        if (!productResponse.ok || !productData.success) {
          throw new Error("Unable to load products.");
        }

        setProducts(
          (productData.products || []).filter(
            (product) => product.available !== false
          )
        );

        if (categoryResponse.ok && categoryData.success) {
          setCategories(categoryData.categories || []);
        }
      } catch (err) {
        console.error("Products loading error:", err);
        setError("Unable to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredProducts = useMemo(() => {
    const term = search.toLowerCase().trim().replace(/\s+/g, " ");

    return products.filter((product) => {
      const matchesCategory =
        !selectedCategory ||
        product.category?.toLowerCase() === selectedCategory.toLowerCase();

      const searchableFields = [
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
        product.originalPrice,
      ];

      const searchableText = searchableFields
        .filter((value) => value !== null && value !== undefined)
        .join(" ")
        .toLowerCase()
        .replace(/\s+/g, " ");

      return matchesCategory && (!term || searchableText.includes(term));
    });
  }, [search, products, selectedCategory]);

  const handleAddToCart = (product) => {
    const result = addToCart(product);

    if (result.success) {
      setAddedProduct(product._id || product.id);
      setTimeout(() => setAddedProduct(""), 2000);
    } else {
      alert(result.message);
    }
  };

  const isInCart = (productId) =>
    cartItems.some((item) => item._id === productId || item.id === productId);

  const getWhatsAppLink = (product) => {
    const discount = getDiscount(product);

    const message = `Hello Imtiaz Trader! I am interested in ${product.name}.${
      discount
        ? ` The listed discounted price is ${formatPrice(discount.sellingPrice)} instead of ${formatPrice(discount.originalPrice)}.`
        : ""
    } Please share more details and availability.`;

    return `https://wa.me/923355703153?text=${encodeURIComponent(message)}`;
  };

  const changeCategory = (category) => {
    if (category) {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
  };

  return (
    <main className="products-page">
      <section className="bg-dark text-white products-heading">
        <div className="container">
          <p className="text-danger fw-bold mb-2">IMTIAZ TRADER</p>
          <h1 className="fw-bold">{selectedCategory || "Our Products"}</h1>
          <p className="text-white-50 mb-0">
            Explore laptops, computers and technology products.
          </p>
        </div>
      </section>

      <section className="container products-container">
        <div className="mb-4">
          <input
            type="search"
            className="form-control form-control-lg"
            placeholder="Search products, brands or specifications..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="d-flex flex-wrap gap-2 mb-4 category-buttons">
          <button
            className={`btn ${
              !selectedCategory ? "btn-danger" : "btn-outline-danger"
            }`}
            onClick={() => changeCategory("")}
          >
            All Products
          </button>

          {categories.map((category) => (
            <button
              key={category._id}
              className={`btn ${
                selectedCategory === category.name
                  ? "btn-danger"
                  : "btn-outline-danger"
              }`}
              onClick={() => changeCategory(category.name)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold mb-0">
            {selectedCategory || "All Products"}
          </h4>

          <span className="text-secondary small">
            {filteredProducts.length} Products
          </span>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-danger"></div>
            <p className="text-secondary mt-3">Loading products...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : filteredProducts.length > 0 ? (
          <div className="row g-3 g-md-4">
            {filteredProducts.map((product) => {
              const productImage = product.images?.[0] || product.image;
              const productId = product._id || product.id;
              const discount = getDiscount(product);

              return (
                <div className="col-4 col-md-6 col-lg-4" key={productId}>
                  <div className="card h-100 border-0 shadow-sm product-card">
                    <div className="product-image-wrapper">
                      <img
                        src={getImageUrl(productImage)}
                        alt={product.name}
                        onError={(event) => {
                          event.currentTarget.onerror = null;
                          event.currentTarget.src = PLACEHOLDER;
                        }}
                      />

                      {discount && (
                        <span className="product-discount-badge">
                          {discount.percentage}% OFF
                        </span>
                      )}
                    </div>

                    <div className="card-body d-flex flex-column product-card-body">
                      <span className="text-danger fw-semibold product-brand">
                        {product.brand}
                      </span>

                      <h5 className="fw-bold mt-2 product-name">
                        {product.name}
                      </h5>

                      <p className="text-secondary product-description">
                        {product.description}
                      </p>

                      <div className="product-specs text-secondary">
                        {product.processor && (
                          <div>Processor: {product.processor}</div>
                        )}

                        {product.ram && <div>RAM: {product.ram}</div>}

                        {product.generation && (
                          <div>Generation: {product.generation}</div>
                        )}
                      </div>

                      <div className="product-pricing">
                        {discount ? (
                          <>
                            <div className="product-sale-price">
                              {formatPrice(discount.sellingPrice)}
                            </div>

                            <div className="product-original-price">
                              {formatPrice(discount.originalPrice)}
                            </div>

                            <div className="product-you-save">
                              You save {formatPrice(
                                discount.originalPrice - discount.sellingPrice
                              )}
                            </div>
                          </>
                        ) : (
                          <h5 className="fw-bold product-price">
                            {product.price != null && product.price !== ""
                              ? formatPrice(Number(product.price))
                              : "Contact for Price"}
                          </h5>
                        )}
                      </div>

                      <div className="mt-auto product-actions">
                        <Link
                          to={`/product/${productId}`}
                          className="btn btn-danger w-100 mb-2"
                        >
                          View Details
                          <i className="bi bi-arrow-right ms-2"></i>
                        </Link>

                        <button
                          type="button"
                          className={`btn w-100 mb-2 ${
                            addedProduct === productId
                              ? "btn-success"
                              : "btn-outline-dark"
                          }`}
                          onClick={() => handleAddToCart(product)}
                        >
                          {addedProduct === productId
                            ? "Added to Cart"
                            : isInCart(productId)
                              ? "Add Another"
                              : "Add to Cart"}
                        </button>

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
            <i className="bi bi-search display-1 text-secondary"></i>
            <h3 className="fw-bold mt-3">No Products Found</h3>
            <p className="text-secondary">
              Try another category or search term.
            </p>

            <button
              className="btn btn-outline-danger"
              onClick={() => {
                setSearch("");
                changeCategory("");
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      <style>{`
        .products-heading {
          padding: 48px 0;
        }

        .products-container {
          padding-top: 45px;
          padding-bottom: 45px;
        }

        .product-card {
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 22px rgba(0,0,0,0.12) !important;
        }

        .product-image-wrapper {
          height: 225px;
          padding: 12px;
          margin-bottom: 8px;
          background: #f8f9fa;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .product-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .product-discount-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          z-index: 2;
          background: #dc2626;
          color: #fff;
          font-size: 13px;
          font-weight: 800;
          padding: 7px 11px;
          border-radius: 5px;
          box-shadow: 0 2px 7px rgba(0,0,0,0.18);
        }

        .product-card-body {
          padding: 18px;
        }

        .product-brand {
          font-size: 13px;
        }

        .product-name {
          font-size: 18px;
          line-height: 1.4;
        }

        .product-description {
          font-size: 13px;
          line-height: 1.5;
        }

        .product-specs {
          font-size: 12px;
          margin-bottom: 12px;
        }

        .product-pricing {
          margin-bottom: 15px;
        }

        .product-sale-price {
          color: #dc2626;
          font-size: 20px;
          font-weight: 800;
          line-height: 1.4;
        }

        .product-original-price {
          color: #888;
          font-size: 13px;
          text-decoration: line-through;
          margin-top: 2px;
        }

        .product-you-save {
          color: #198754;
          font-size: 12px;
          font-weight: 700;
          margin-top: 4px;
        }

        .product-price {
          font-size: 18px;
          margin-bottom: 0;
        }

        @media (max-width: 767px) {
          .products-heading {
            padding: 22px 0;
          }

          .products-heading h1 {
            font-size: 22px;
          }

          .products-heading p:last-child {
            font-size: 11px;
          }

          .products-container {
            padding-top: 18px;
            padding-bottom: 25px;
          }

          .products-container .form-control-lg {
            font-size: 12px;
            padding: 9px 10px;
          }

          .category-buttons {
            gap: 5px !important;
            margin-bottom: 18px !important;
          }

          .category-buttons .btn {
            font-size: 10px;
            padding: 6px 8px;
          }

          .products-container h4 {
            font-size: 16px;
          }

          .product-card {
            border-radius: 8px;
          }

          .product-image-wrapper {
            height: 100px;
            padding: 5px;
          }

          .product-discount-badge {
            top: 5px;
            left: 5px;
            font-size: 8px;
            padding: 4px 5px;
            border-radius: 3px;
          }

          .product-card-body {
            padding: 7px;
          }

          .product-brand {
            font-size: 9px;
          }

          .product-name {
            font-size: 11px;
            line-height: 1.3;
            margin-top: 4px !important;
            margin-bottom: 5px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .product-description {
            font-size: 9px;
            line-height: 1.3;
            margin-bottom: 6px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .product-specs {
            font-size: 8px;
            line-height: 1.4;
            margin-bottom: 7px;
          }

          .product-pricing {
            margin-bottom: 8px;
          }

          .product-sale-price {
            font-size: 11px;
          }

          .product-original-price {
            font-size: 8px;
          }

          .product-you-save {
            font-size: 8px;
            margin-top: 2px;
          }

          .product-price {
            font-size: 11px;
            margin-bottom: 8px;
          }

          .product-actions .btn {
            font-size: 9px;
            padding: 6px 2px;
            border-radius: 5px;
            white-space: normal;
            line-height: 1.3;
          }

          .product-actions .btn i {
            margin-right: 1px !important;
            margin-left: 1px !important;
          }
        }

        @media (max-width: 360px) {
          .product-image-wrapper {
            height: 85px;
          }

          .product-card-body {
            padding: 5px;
          }

          .product-name {
            font-size: 10px;
          }

          .product-description {
            font-size: 8px;
          }

          .product-specs {
            font-size: 7px;
          }

          .product-sale-price {
            font-size: 10px;
          }

          .product-original-price,
          .product-you-save {
            font-size: 7px;
          }

          .product-price {
            font-size: 10px;
          }

          .product-actions .btn {
            font-size: 8px;
            padding: 5px 1px;
          }
        }
      `}</style>
    </main>
  );
}

export default Products;
