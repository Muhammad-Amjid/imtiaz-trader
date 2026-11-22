
function Home() {
  const welcomeText = 'WELCOME TO IMTIAZ TRADER';

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content">

          <div className="hero-welcome">
            {Array.from(welcomeText).map((letter, index) => (
              <span
                key={index}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </div>

          <h1 className="hero-title">
            Find the Right
            <br />
            <span>Technology</span> for You
          </h1>

          <p className="hero-description">
            Discover quality laptops, computers and accessories
            at Imtiaz Trader. Explore new and used devices from
            trusted brands at competitive prices.
          </p>

          <div className="hero-actions">
            <a
              href="#categories"
              className="btn btn-danger btn-lg hero-button"
            >
              Explore Our Products
              <i className="bi bi-arrow-right ms-2"></i>
            </a>

            <a
              href="https://wa.me/923495092195"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-dark btn-lg"
            >
              <i className="bi bi-whatsapp me-2"></i>
              Contact Us
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Home;
