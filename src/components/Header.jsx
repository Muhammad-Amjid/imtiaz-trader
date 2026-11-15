
import React, { useState } from "react";
import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import logo from "../assets/logo.png";
import { useCart } from "../context/CartContext";

function Header() {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { cartCount } = useCart();

  const handleSearch = (e) => {
    e.preventDefault();

    const query = search.trim();

    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setSearch("");
      setMenuOpen(false);
    }
  };

  const closeMenu = () => setMenuOpen(false);

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) =>
    `header-nav-link ${isActive(path) ? "active" : ""}`;

  return (
    <>
      <header className="imtiaz-header">
        <div className="container">
          <div className="header-main">

            {/* Logo */}
            <Link
              to="/"
              className="header-logo"
              aria-label="Imtiaz Trader Home"
              onClick={closeMenu}
            >
              <img src={logo} alt="Imtiaz Trader" />
            </Link>

            {/* Desktop Search */}
            <div className="header-search desktop-search">
              <form onSubmit={handleSearch}>
                <div className="input-group">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search laptops, brands or models..."
                    aria-label="Search products"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />

                  <button
                    className="btn btn-danger"
                    type="submit"
                    disabled={!search.trim()}
                    aria-label="Submit search"
                  >
                    <i className="bi bi-search"></i>
                  </button>
                </div>
              </form>
            </div>

            {/* Desktop Navigation */}
            <nav className="header-desktop-nav" aria-label="Main navigation">
              <Link to="/" className={navLinkClass("/")}>Home</Link>
              <Link to="/products" className={navLinkClass("/products")}>Products</Link>
              <Link to="/about" className={navLinkClass("/about")}>About Us</Link>
              <Link to="/contact" className={navLinkClass("/contact")}>Contact</Link>

              <Link
                to="/cart"
                className={`header-cart ${isActive("/cart") ? "active" : ""}`}
                aria-label={`Shopping cart with ${cartCount} items`}
              >
                <i className="bi bi-cart3"></i>
                {cartCount > 0 && (
                  <span className="cart-count">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>

              {/* Admin Shortcut */}
              <Link to="/admin/login" className="header-admin-link">
                <i className="bi bi-shield-lock"></i>
                Admin
              </Link>
            </nav>

            {/* Mobile Cart */}
            <Link
              to="/cart"
              className="mobile-cart"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <i className="bi bi-cart3"></i>
              {cartCount > 0 && (
                <span className="cart-count">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="mobile-menu-button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
            >
              <i className={`bi ${menuOpen ? "bi-x-lg" : "bi-list"}`}></i>
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className={`mobile-navigation ${menuOpen ? "show" : ""}`}>

            <form onSubmit={handleSearch} className="mobile-search">
              <div className="input-group">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Search products"
                />

                <button
                  className="btn btn-danger"
                  type="submit"
                  disabled={!search.trim()}
                  aria-label="Submit search"
                >
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </form>

            <Link to="/" onClick={closeMenu} className={navLinkClass("/")}>
              <i className="bi bi-house-door"></i> Home
            </Link>

            <Link to="/products" onClick={closeMenu} className={navLinkClass("/products")}>
              <i className="bi bi-grid"></i> Products
            </Link>

            <Link to="/about" onClick={closeMenu} className={navLinkClass("/about")}>
              <i className="bi bi-info-circle"></i> About Us
            </Link>

            <Link to="/contact" onClick={closeMenu} className={navLinkClass("/contact")}>
              <i className="bi bi-telephone"></i> Contact
            </Link>

            <Link to="/cart" onClick={closeMenu} className={navLinkClass("/cart")}>
              <i className="bi bi-cart3"></i>
              Shopping Cart ({cartCount})
            </Link>

            <Link
              to="/admin/login"
              onClick={closeMenu}
              className="mobile-admin-link"
            >
              <i className="bi bi-shield-lock"></i>
              Admin Login
            </Link>
          </div>
        </div>
      </header>

      <style>{`
        .imtiaz-header {
          position: relative;
          z-index: 1000;
          width: 100%;
          background: #151515;
          padding: 13px 0;
          box-shadow: 0 4px 18px rgba(0,0,0,0.15);
        }

        .header-main {
          display: grid;
          grid-template-columns: 190px minmax(200px, 1fr) auto;
          align-items: center;
          gap: 25px;
        }

        .header-logo {
          display: block;
          width: 170px;
          max-width: 100%;
        }

        .header-logo img {
          display: block;
          width: 100%;
          height: auto;
          border-radius: 12px;
        }

        .header-search {
          width: 100%;
          max-width: 500px;
          justify-self: center;
        }

        .header-search .form-control,
        .mobile-search .form-control {
          min-height: 43px;
          border: none;
          box-shadow: none;
        }

        .header-search .btn,
        .mobile-search .btn {
          min-width: 48px;
        }

        .header-desktop-nav {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 17px;
          white-space: nowrap;
        }

        .header-nav-link {
          color: #fff;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          transition: 0.25s ease;
        }

        .header-nav-link:hover,
        .header-nav-link.active {
          color: #ff4141;
        }

        .header-cart,
        .mobile-cart {
          position: relative;
          display: inline-flex;
          align-items: center;
          color: #fff;
          font-size: 23px;
          text-decoration: none;
          transition: 0.25s ease;
        }

        .header-cart:hover,
        .header-cart.active,
        .mobile-cart:hover {
          color: #ff4141;
        }

        .cart-count {
          position: absolute;
          top: -8px;
          right: -10px;
          min-width: 18px;
          height: 18px;
          padding: 0 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 20px;
          background: #dc2626;
          color: #fff;
          font-size: 10px;
          font-weight: 800;
        }

        .header-admin-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 10px 13px;
          border-radius: 7px;
          background: #dc2626;
          color: white;
          text-decoration: none;
          font-size: 13px;
          font-weight: 700;
          transition: 0.3s ease;
        }

        .header-admin-link:hover {
          background: #b91c1c;
          color: white;
          transform: translateY(-2px);
        }

        .mobile-cart,
        .mobile-menu-button,
        .mobile-navigation {
          display: none;
        }

        /* Tablet and smaller laptops */

        @media (max-width: 1100px) {
          .header-main {
            grid-template-columns: 150px minmax(160px, 1fr) auto;
            gap: 15px;
          }

          .header-logo {
            width: 145px;
          }

          .header-desktop-nav {
            gap: 11px;
          }

          .header-nav-link {
            font-size: 13px;
          }

          .header-admin-link {
            padding: 9px 10px;
            font-size: 12px;
          }
        }

        /* Mobile navigation */

        @media (max-width: 850px) {
          .imtiaz-header {
            padding: 11px 0;
          }

          .header-main {
            display: flex;
            justify-content: space-between;
            gap: 15px;
          }

          .header-logo {
            width: 145px;
            margin-right: auto;
          }

          .desktop-search,
          .header-desktop-nav {
            display: none;
          }

          .mobile-cart {
            display: inline-flex;
            margin-right: 8px;
          }

          .mobile-menu-button {
            width: 42px;
            height: 42px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 8px;
            background: transparent;
            color: white;
            font-size: 25px;
          }

          .mobile-menu-button:hover {
            background: #dc2626;
            border-color: #dc2626;
          }

          .mobile-navigation {
            display: flex;
            flex-direction: column;
            gap: 0;
            max-height: 0;
            overflow: hidden;
            opacity: 0;
            transition: max-height 0.35s ease, opacity 0.25s ease, padding 0.3s ease;
          }

          .mobile-navigation.show {
            max-height: 550px;
            opacity: 1;
            padding-top: 17px;
          }

          .mobile-search {
            margin-bottom: 12px;
          }

          .mobile-navigation .header-nav-link,
          .mobile-admin-link {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 13px 10px;
            border-bottom: 1px solid rgba(255,255,255,0.09);
            color: #fff;
            text-decoration: none;
            font-size: 14px;
            font-weight: 600;
          }

          .mobile-navigation .header-nav-link:hover,
          .mobile-navigation .header-nav-link.active {
            color: #ff4141;
            background: rgba(255,255,255,0.04);
          }

          .mobile-admin-link {
            margin-top: 12px;
            justify-content: center;
            border: none;
            border-radius: 7px;
            background: #dc2626;
            color: white;
          }

          .mobile-admin-link:hover {
            background: #b91c1c;
            color: white;
          }
        }

        @media (max-width: 400px) {
          .header-logo {
            width: 125px;
          }

          .mobile-menu-button {
            width: 39px;
            height: 39px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .imtiaz-header *,
          .imtiaz-header *::before,
          .imtiaz-header *::after {
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </>
  );
}

export default Header;
