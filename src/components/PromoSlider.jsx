
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./PromoSlider.css";

const slides = [
  {
    small: "WELCOME TO IMTIAZ TRADER",
    title: "Your Trusted Technology Partner",
    description:
      "Explore quality new and used laptops, computers and IT accessories at great value.",
    button: "Explore Laptops",
    link: "/products",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1800&q=85",
  },
  {
    small: "BUSINESS & PROFESSIONAL TECHNOLOGY",
    title: "Technology for Your Business",
    description:
      "Discover computers, networking equipment and IT solutions for your business.",
    button: "Contact Us",
    link: "/contact",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1800&q=85",
  },
  {
    small: "QUALITY ACCESSORIES & IT EQUIPMENT",
    title: "Upgrade Your Technology",
    description:
      "Find the right accessories and technology for work, study and everyday use.",
    button: "View Products",
    link: "/products",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1800&q=85",
  },
];

function PromoSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const slide = slides[active];

  const previousSlide = () => {
    setActive((current) => (current - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setActive((current) => (current + 1) % slides.length);
  };

  return (
    <section
      className="promo-slider"
      style={{ backgroundImage: `url(${slide.image})` }}
      aria-label="Featured promotions"
    >
      <div className="promo-overlay">
        <div className="container">
          <div className="promo-content" key={active}>
            <p className="promo-small">{slide.small}</p>

            <h1 className="promo-title">
              {slide.title.split(" ").map((word, index) => (
                <span className="promo-word" key={index}>
                  {word.split("").map((letter, letterIndex) => (
                    <span
                      className="promo-letter"
                      key={letterIndex}
                      style={{
                        animationDelay: `${
                          0.5 + index * 0.2 + letterIndex * 0.035
                        }s`,
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            <p className="promo-description">
              {slide.description}
            </p>

            <Link to={slide.link} className="promo-button">
              {slide.button}
              <i className="bi bi-arrow-right ms-2"></i>
            </Link>
          </div>

          {/* Slider Controls */}
          <div className="promo-controls">
            <button
              type="button"
              onClick={previousSlide}
              aria-label="Previous slide"
            >
              <i className="bi bi-chevron-left"></i>
            </button>

            {slides.map((item, index) => (
              <button
                type="button"
                key={index}
                className={`promo-indicator ${
                  active === index ? "active" : ""
                }`}
                onClick={() => setActive(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={active === index ? "true" : undefined}
              />
            ))}

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next slide"
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PromoSlider;
