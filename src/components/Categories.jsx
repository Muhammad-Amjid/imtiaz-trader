
import React from "react";
import { Link } from "react-router-dom";
import { brands } from "../data/brands";

const brandImages = {
  hp: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=700",
  dell: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=700",
  lenovo: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=700",
  thinkpad: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=700",
  dynabook: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=700",
  macbook: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=700",
};

function Categories() {
  return (
    <section className="laptop-brands-section">
      <div className="container">
        <div className="brands-heading text-center">
          <span className="brands-label">OUR COLLECTION</span>
          <h2>Shop by Laptop Brand</h2>
          <p>
            Explore laptops from the world's leading technology brands.
          </p>
        </div>

        <div className="row g-3 g-md-4">
          {brands.map((brand) => (
            <div className="col-6 col-md-4" key={brand.id}>
              <Link
                to={`/brand/${encodeURIComponent(brand.name)}`}
                className="brand-link"
              >
                <div className="brand-card">
                  <div className="brand-image-wrapper">
                    <img
                      src={brandImages[brand.id] || brandImages.hp}
                      alt={`${brand.name} laptops`}
                      loading="lazy"
                    />
                    <div className="brand-image-overlay"></div>
                  </div>

                  <div className="brand-card-content">
                    <h3>{brand.name}</h3>
                    <p>{brand.description}</p>
                    <span>
                      Explore Brand <i className="bi bi-arrow-right"></i>
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .laptop-brands-section {
          padding: 65px 0;
          background: #f8f8f8;
          overflow: hidden;
        }

        .brands-heading {
          margin-bottom: 38px;
        }

        .brands-label {
          color: #a5222d;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 2px;
        }

        .brands-heading h2 {
          color: #171717;
          font-size: 34px;
          font-weight: 800;
          margin: 12px 0;
        }

        .brands-heading p {
          color: #777;
          font-size: 16px;
          margin: 0;
        }

        .brand-link {
          display: block;
          height: 100%;
          text-decoration: none;
        }

        .brand-card {
          height: 100%;
          min-height: 290px;
          background: #fff;
          border-radius: 13px;
          overflow: hidden;
          border: 1px solid #eee;
          box-shadow: 0 5px 18px rgba(0,0,0,.05);
          transition: transform .3s ease, box-shadow .3s ease;
        }

        .brand-card:hover {
          transform: translateY(-7px);
          box-shadow: 0 14px 28px rgba(0,0,0,.12);
        }

        .brand-image-wrapper {
          position: relative;
          height: 190px;
          overflow: hidden;
          background: #eee;
        }

        .brand-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform .5s ease;
        }

        .brand-card:hover .brand-image-wrapper img {
          transform: scale(1.07);
        }

        .brand-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0,0,0,.35),
            transparent 60%
          );
        }

        .brand-card-content {
          padding: 18px;
          text-align: center;
        }

        .brand-card-content h3 {
          color: #171717;
          font-size: 21px;
          font-weight: 800;
          margin-bottom: 7px;
        }

        .brand-card-content p {
          color: #777;
          font-size: 13px;
          margin-bottom: 12px;
        }

        .brand-card-content span {
          color: #a5222d;
          font-size: 13px;
          font-weight: 800;
        }

        .brand-card-content span i {
          margin-left: 5px;
          transition: margin .3s ease;
        }

        .brand-card:hover .brand-card-content span i {
          margin-left: 10px;
        }

        @media (max-width: 768px) {
          .laptop-brands-section {
            padding: 45px 0;
          }

          .brands-heading {
            margin-bottom: 28px;
          }

          .brands-heading h2 {
            font-size: 28px;
          }

          .brands-heading p {
            font-size: 14px;
          }

          .brand-card {
            min-height: 250px;
          }

          .brand-image-wrapper {
            height: 155px;
          }

          .brand-card-content {
            padding: 14px 10px;
          }

          .brand-card-content h3 {
            font-size: 18px;
          }
        }

        @media (max-width: 480px) {
          .laptop-brands-section {
            padding: 35px 0;
          }

          .brands-heading h2 {
            font-size: 24px;
          }

          .brands-label {
            font-size: 11px;
          }

          .brand-card {
            min-height: 215px;
            border-radius: 9px;
          }

          .brand-image-wrapper {
            height: 125px;
          }

          .brand-card-content {
            padding: 12px 7px;
          }

          .brand-card-content h3 {
            font-size: 16px;
          }

          .brand-card-content p {
            font-size: 11px;
            margin-bottom: 8px;
          }

          .brand-card-content span {
            font-size: 11px;
          }
        }
      `}</style>
    </section>
  );
}

export default Categories;
