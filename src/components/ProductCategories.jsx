
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API = "http://localhost:5000/api/categories";

function ProductCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(API);
        const data = await response.json();

        if (response.ok) {
          setCategories(data.categories || []);
        }
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };

    fetchCategories();
  }, []);

  if (!categories.length) return null;

  return (
    <section className="product-categories-section">
      <div className="container">

        <div className="product-categories-heading text-center">
          <p className="product-categories-label">
            SHOP BY CATEGORY
          </p>

          <h2>Product Categories</h2>

          <p className="product-categories-description">
            Explore our available product categories.
          </p>
        </div>

        <div className="row g-3 g-md-4">
          {categories.map((category) => (
            <div
              className="col-6 col-md-4 col-lg-3"
              key={category._id}
            >
              <Link
                to={`/products?category=${encodeURIComponent(category.name)}`}
                className="product-category-link"
              >
                <div className="product-category-card">
                  <div className="product-category-icon">
                    <i className="bi bi-grid"></i>
                  </div>

                  <h5>{category.name}</h5>

                  <span className="product-category-arrow">
                    Explore <i className="bi bi-arrow-right"></i>
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .product-categories-section {
          padding: 65px 0;
          background: #ffffff;
          overflow: hidden;
        }

        .product-categories-heading {
          margin-bottom: 35px;
        }

        .product-categories-label {
          color: #a5222d;
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 1.5px;
          margin-bottom: 10px;
        }

        .product-categories-heading h2 {
          color: #171717;
          font-size: 34px;
          font-weight: 800;
          margin-bottom: 12px;
        }

        .product-categories-description {
          color: #777777;
          font-size: 16px;
          margin-bottom: 0;
        }

        .product-category-link {
          display: block;
          height: 100%;
          text-decoration: none;
        }

        .product-category-card {
          height: 100%;
          min-height: 165px;
          padding: 25px 15px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          background: #ffffff;
          border: 1px solid #eeeeee;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease,
                      box-shadow 0.3s ease,
                      border-color 0.3s ease;
        }

        .product-category-card:hover {
          transform: translateY(-7px);
          border-color: #a5222d;
          box-shadow: 0 12px 25px rgba(165, 34, 45, 0.12);
        }

        .product-category-icon {
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff0f1;
          color: #a5222d;
          border-radius: 50%;
          font-size: 24px;
          margin-bottom: 15px;
          transition: all 0.3s ease;
        }

        .product-category-card:hover .product-category-icon {
          background: #a5222d;
          color: #ffffff;
        }

        .product-category-card h5 {
          color: #222222;
          font-size: 17px;
          font-weight: 800;
          margin-bottom: 12px;
          overflow-wrap: anywhere;
        }

        .product-category-arrow {
          color: #a5222d;
          font-size: 13px;
          font-weight: 700;
        }

        .product-category-arrow i {
          margin-left: 4px;
        }

        @media (max-width: 768px) {
          .product-categories-section {
            padding: 45px 0;
          }

          .product-categories-heading {
            margin-bottom: 25px;
          }

          .product-categories-heading h2 {
            font-size: 28px;
          }

          .product-categories-description {
            font-size: 14px;
          }

          .product-category-card {
            min-height: 145px;
            padding: 20px 10px;
          }

          .product-category-icon {
            width: 45px;
            height: 45px;
            font-size: 21px;
            margin-bottom: 12px;
          }

          .product-category-card h5 {
            font-size: 15px;
          }
        }

        @media (max-width: 480px) {
          .product-categories-section {
            padding: 35px 0;
          }

          .product-categories-heading h2 {
            font-size: 24px;
          }

          .product-categories-label {
            font-size: 12px;
          }

          .product-category-card {
            min-height: 130px;
            padding: 16px 8px;
            border-radius: 9px;
          }

          .product-category-icon {
            width: 40px;
            height: 40px;
            font-size: 19px;
            margin-bottom: 10px;
          }

          .product-category-card h5 {
            font-size: 13px;
          }

          .product-category-arrow {
            font-size: 11px;
          }
        }
      `}</style>
    </section>
  );
}

export default ProductCategories;
