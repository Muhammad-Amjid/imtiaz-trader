import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://imtiaz-trader-api.vercel.app/api/auth/login",

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminInfo", JSON.stringify(data.admin));

      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <form onSubmit={handleLogin} style={styles.card}>
        <h1 style={styles.logo}>
          Imtiaz <span style={{ color: "#dc2626" }}>Trader</span>
        </h1>

        <h2 style={styles.heading}>Admin Login</h2>
        <p style={styles.subtitle}>Sign in to manage your online store.</p>

        {error && <div style={styles.error}>{error}</div>}

        <label style={styles.label}>Email Address</label>
        <input
          type="email"
          placeholder="Enter admin email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <label style={styles.label}>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Signing in..." : "Login to Dashboard"}
        </button>

        <p style={styles.footer}>Authorized administrators only</p>
      </form>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f4f4",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    background: "#fff",
    padding: "35px",
    borderRadius: "12px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
  },
  logo: {
    textAlign: "center",
    fontSize: "28px",
    color: "#111",
    marginBottom: "30px",
  },
  heading: {
    fontSize: "23px",
    color: "#111",
    marginBottom: "8px",
  },
  subtitle: {
    color: "#666",
    marginBottom: "25px",
  },
  label: {
    display: "block",
    fontWeight: "600",
    marginBottom: "8px",
    color: "#222",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    marginBottom: "20px",
    fontSize: "15px",
  },
  button: {
    width: "100%",
    padding: "14px",
    background: "#dc2626",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  error: {
    background: "#fee2e2",
    color: "#b91c1c",
    padding: "12px",
    borderRadius: "6px",
    marginBottom: "18px",
  },
  footer: {
    textAlign: "center",
    color: "#777",
    fontSize: "12px",
    marginTop: "22px",
  },
};

export default AdminLogin;
