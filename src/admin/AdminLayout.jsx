
import React, { useState } from "react";
import {
  NavLink,
  Navigate,
  Outlet,
  useNavigate,
} from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  const menuItems = [
  { label: "Dashboard", path: "/admin/dashboard", icon: "▦" },
  { label: "Products", path: "/admin/products", icon: "▣" },
  { label: "Orders", path: "/admin/orders", icon: "🛒" },
  { label: "Customers", path: "/admin/customers", icon: "♙" },
  { label: "Categories", path: "/admin/categories", icon: "▤" },
  { label: "Customer Enquiries", path: "/admin/enquiries", icon: "✉" },
];

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminInfo");
    navigate("/admin/login");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="admin-layout">
      <style>{`
        .admin-layout {
          min-height: 100vh;
          display: flex;
          background: #f5f6f8;
          color: #222;
          font-family: Arial, sans-serif;
        }

        .admin-sidebar {
          width: 255px;
          min-width: 255px;
          min-height: 100vh;
          height: 100vh;
          position: sticky;
          top: 0;
          background: #151515;
          color: white;
          padding: 25px 17px;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          z-index: 100;
        }

        .admin-logo {
          font-size: 23px;
          font-weight: 800;
          margin: 4px 8px 40px;
        }

        .admin-logo span,
        .admin-mobile-header strong span {
          color: #ef4444;
        }

        .admin-menu-title {
          color: #888;
          font-size: 11px;
          font-weight: bold;
          letter-spacing: 1.2px;
          padding: 0 10px;
          margin-bottom: 13px;
        }

        .admin-menu {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .admin-menu a {
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 13px 12px;
          border-radius: 7px;
          color: #ccc;
          text-decoration: none;
          font-size: 14px;
          transition: 0.2s;
        }

        .admin-menu a:hover {
          background: #292929;
          color: white;
        }

        .admin-menu a.active {
          background: #dc2626;
          color: white;
          font-weight: bold;
        }

        .admin-menu-icon {
          width: 22px;
          text-align: center;
          font-size: 17px;
        }

        .admin-sidebar-bottom {
          margin-top: auto;
          padding-top: 25px;
        }

        .admin-logout {
          width: 100%;
          padding: 12px;
          border: 1px solid #444;
          border-radius: 7px;
          color: #eee;
          background: transparent;
          cursor: pointer;
          text-align: left;
        }

        .admin-logout:hover {
          background: #292929;
        }

        .admin-content {
          flex: 1;
          min-width: 0;
          min-height: 100vh;
        }

        .admin-mobile-header {
          display: none;
        }

        .admin-overlay {
          display: none;
        }

        @media (max-width: 650px) {
          .admin-layout {
            display: block;
          }

          .admin-sidebar {
            position: fixed;
            top: 0;
            left: -270px;
            width: 255px;
            height: 100dvh;
            min-height: 100dvh;
            transition: left 0.25s ease;
            box-shadow: none;
          }

          .admin-sidebar.open {
            left: 0;
            box-shadow: 5px 0 25px rgba(0,0,0,0.2);
          }

          .admin-overlay.show {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.45);
            z-index: 90;
          }

          .admin-mobile-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            padding: 13px 16px;
            background: #151515;
            color: white;
            position: sticky;
            top: 0;
            z-index: 80;
          }

          .admin-mobile-header strong {
            font-size: 17px;
          }

          .admin-menu-toggle {
            background: #dc2626;
            color: white;
            border: none;
            border-radius: 6px;
            padding: 9px 12px;
            font-size: 18px;
            cursor: pointer;
          }
        }
      `}</style>

      <div
        className={`admin-overlay ${menuOpen ? "show" : ""}`}
        onClick={closeMenu}
      />

      <aside className={`admin-sidebar ${menuOpen ? "open" : ""}`}>
        <h2 className="admin-logo">
          Imtiaz <span>Trader</span>
        </h2>

        <p className="admin-menu-title">ADMIN MENU</p>

        <nav className="admin-menu">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={closeMenu}
              className={({ isActive }) => isActive ? "active" : ""}
            >
              <span className="admin-menu-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-bottom">
          <button className="admin-logout" onClick={logout}>
            ⇥ &nbsp; Logout
          </button>
        </div>
      </aside>

      <div className="admin-content">
        <header className="admin-mobile-header">
          <button
            className="admin-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle admin menu"
          >
            ☰
          </button>

          <strong>
            Imtiaz <span>Trader</span>
          </strong>

          <button
            className="admin-menu-toggle"
            onClick={logout}
            aria-label="Logout"
          >
            ⇥
          </button>
        </header>

        <Outlet />
      </div>
    </div>
  );
}
